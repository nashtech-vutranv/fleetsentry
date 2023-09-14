import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommonExceptionDaysEntity } from "src/entities";
import { Repository } from "typeorm";
import { IAuth, ICreateCommonExceptionDay, IUpdateCommonExceptionDay } from "src/core/interface";
import { ErrorCode } from "src/enums";
import { AppException } from "src/core/exceptions";

@Injectable()
export class CommonExceptionDayService {
  constructor(
    @InjectRepository(CommonExceptionDaysEntity)
    private commonExceptionDaysRepo: Repository<CommonExceptionDaysEntity>,
  ) {}

  public checkDateDuplicated(requests: ICreateCommonExceptionDay[]) {
    const uniqueDates = new Set();
    let isDuplicated = false;
    for (const request of requests) {
      if (uniqueDates.has(request.date)) {
        isDuplicated = true;
        break;
      }
      uniqueDates.add(request.date);
    }
    return isDuplicated;
  }

  public checkInvalidData(request: ICreateCommonExceptionDay) {
    const { dayoff_flag, possible_time_from, possible_time_to, possible_count } = request;
    if (dayoff_flag !== 0 && dayoff_flag !== 1) return true;
    if (dayoff_flag === 0) {
      if (possible_time_from || possible_time_to || possible_count) return true;
      return false;
    }
    if ((possible_time_from || possible_time_to) && possible_count) return true;
    if ((!possible_time_from || !possible_time_to) && !possible_count) return true;
    return false;
  }

  public checkUniqIds(ids: number[]) {
    const set = new Set();
    for (const id of ids) {
      if (set.has(id)) {
        return false;
      }
      set.add(id);
    }
    return true;
  }

  public async getCommonExceptionDays(): Promise<any> {
    const commonExceptionDays = await this.commonExceptionDaysRepo.find({
      select: ["id", "date", "dayoff_flag", "possible_count", "possible_time_from", "possible_time_to"],
      order: {
        date: "DESC",
      },
    });
    return commonExceptionDays;
  }

  public async createCommonExceptionDays(auth: IAuth, createRequests: ICreateCommonExceptionDay[]): Promise<any> {
    const entityManager = this.commonExceptionDaysRepo.manager;
    const queryRunner = entityManager.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      if (this.checkDateDuplicated(createRequests)) {
        throw new AppException(ErrorCode.E203003);
      }
      const createdItems = [];
      for (const request of createRequests) {
        const isRequestInvalid = this.checkInvalidData(request);
        if (isRequestInvalid) {
          throw new AppException(ErrorCode.E203003);
        }
        const item: any = {
          ...request,
        };
        item.company_code = auth?.company_code || "1";
        item.created_by = auth?.id;
        const findItemByDate = await this.commonExceptionDaysRepo.findOne({
          where: {
            date: item.date,
          },
        });
        if (findItemByDate) {
          throw new AppException(ErrorCode.E203001);
        }
        const newItem = this.commonExceptionDaysRepo.create(item);
        createdItems.push(newItem);
      }
      await this.commonExceptionDaysRepo.save(createdItems);
      await queryRunner.commitTransaction();
      return createdItems;
    } catch (error) {
      if (error.response === ErrorCode.E203003) {
        throw new NotFoundException("Invalid request data");
      }
      if (error.response === ErrorCode.E203001) {
        throw new NotFoundException("Date has already existed");
      }
      throw new NotFoundException("Failed to create data");
    } finally {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      await queryRunner.release();
    }
  }

  public async updateCommonExceptionDays(auth: IAuth, updateRequests: IUpdateCommonExceptionDay[]): Promise<any> {
    const entityManager = this.commonExceptionDaysRepo.manager;
    const queryRunner = entityManager.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      if (this.checkDateDuplicated(updateRequests)) {
        throw new AppException(ErrorCode.E203003);
      }
      const updatedItems = [];
      for (const request of updateRequests) {
        const isRequestInvalid = this.checkInvalidData(request);
        if (isRequestInvalid || !request.id) {
          throw new AppException(ErrorCode.E203003);
        }
        const findItem = await this.commonExceptionDaysRepo.findOne({
          where: {
            id: request.id,
            date: request.date.toString(),
          },
        });
        if (!findItem) {
          throw new AppException(ErrorCode.E203002);
        }
        findItem.dayoff_flag = request.dayoff_flag;
        findItem.possible_time_from = request.possible_time_from;
        findItem.possible_time_to = request.possible_time_to;
        findItem.possible_count = request.possible_count;
        findItem.updated_by = auth?.id;
        await this.commonExceptionDaysRepo.save(findItem);
        updatedItems.push(findItem);
      }
      await queryRunner.commitTransaction();
      return updatedItems;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.response === ErrorCode.E203003) {
        throw new NotFoundException("Invalid request data");
      }
      if (error.response === ErrorCode.E203002) {
        throw new NotFoundException("Data not found");
      }
      throw error;
    } finally {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      await queryRunner.release();
    }
  }

  public async deleteCommonExceptionDays(auth: IAuth, deleteIds: number[]): Promise<any> {
    const entityManager = this.commonExceptionDaysRepo.manager;
    const queryRunner = entityManager.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      if (!this.checkUniqIds(deleteIds)) {
        throw new AppException(ErrorCode.E203003);
      }
      const deletedItems = [];
      for (const id of deleteIds) {
        const findItem = await this.commonExceptionDaysRepo.findOne({
          where: {
            id,
          },
        });
        if (!findItem) {
          throw new AppException(ErrorCode.E203002);
        }
        await this.commonExceptionDaysRepo.delete({ id });
        deletedItems.push(findItem);
      }
      await queryRunner.commitTransaction();
      return deletedItems;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.response === ErrorCode.E203002) {
        throw new NotFoundException("Data not found");
      }
      if (error.response === ErrorCode.E203003) {
        throw new NotFoundException("Invalid request data");
      }
      throw error;
    } finally {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      await queryRunner.release();
    }
  }
}
