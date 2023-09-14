import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReasonEntity } from "src/entities";
import { Like, Repository } from "typeorm";
import { Paginate } from "src/utils";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";
import { IAuth } from "src/core/interface";
import { plainToClass } from "class-transformer";
import { IPaginateReq } from "src/core/decorators";
import { CreateMstReasonDto, IndexMstReasonDto, UpdateMstReasonDto } from "./mst-reason.dto";

@Injectable()
export class MstReasonService {
  constructor(@InjectRepository(ReasonEntity) private mstReasonRepo: Repository<ReasonEntity>) {}

  /**
   * @author nvtoan27101994@gmail.com
   * @functionName index
   * @description
   */
  public async index(filterRequest: IndexMstReasonDto, pagination: IPaginateReq): Promise<any> {
    const queryBuilder = this.mstReasonRepo.createQueryBuilder("mst_reasons").select(["mst_reasons.*"]);

    if (filterRequest.id) {
      queryBuilder.andWhere({
        id: filterRequest.id,
      });
    }

    if (filterRequest.inspection_type_id) {
      queryBuilder.andWhere({
        inspection_type_id: filterRequest.inspection_type_id,
      });
    }

    if (filterRequest.inspection_result_code) {
      queryBuilder.andWhere({
        inspection_result_code: filterRequest.inspection_result_code,
      });
    }

    if (filterRequest.name) {
      queryBuilder.andWhere({
        name: Like(filterRequest.name),
      });
    }

    if (filterRequest.content) {
      queryBuilder.andWhere({
        content: Like(filterRequest.content),
      });
    }

    filterRequest.sortField = filterRequest.sortField || "id";

    const { page, size } = pagination;
    const take = size;
    const skip = (page - 1) * size;

    const [list, total] = await Promise.all([
      queryBuilder
        .orderBy(`mst_reasons.${filterRequest.sortField}`, filterRequest.sortType)
        .skip(skip)
        .take(take)
        .getRawMany(),

      queryBuilder.getCount(),
    ]);

    return new Paginate(list, total, page, size);
  }

  /**
   * @author nvtoan27101994@gmail.com
   * @functionName show
   * @description
   */
  public async findOne(id: number): Promise<ReasonEntity> {
    const item = await this.mstReasonRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!item) throw new AppException(ErrorCode.E140000);

    return item;
  }

  /**
   * @functionName store
   * @author nvtoan27101994@gmail.com
   * @param auth
   * @param param
   * @rule
   */
  public async store(auth: IAuth, createRequest: CreateMstReasonDto): Promise<ReasonEntity> {
    // TODO : Need check mst reason is valid
    // const checkItem = await this.siteRepo.findOne({
    //   where: {
    //     name: createRequest.name,
    //   },
    // });

    // if (!checkItem) throw new AppException(ErrorCode.E140001);

    const item = plainToClass(ReasonEntity, createRequest, {
      ignoreDecorators: true,
    });

    item.created_by = auth?.id;
    item.updated_by = auth?.id;

    return await this.mstReasonRepo.save(item);
  }

  /**
   * @functionName update
   * @author nvtoan27101994@gmail.com
   * @param auth
   * @param id
   * @param param
   * @rule
   */
  public async update(auth: IAuth, id: number, updateRequest: UpdateMstReasonDto): Promise<ReasonEntity> {
    const checkItem = await this.findOne(id);

    const item = plainToClass(
      ReasonEntity,
      { ...checkItem, ...updateRequest },
      { ignoreDecorators: true, exposeUnsetFields: false },
    );

    item.updated_by = auth?.id;

    return await this.mstReasonRepo.save(item);
  }

  /**
   * @functionName destroy
   * @author nvtoan27101994@gmail.com
   * @param id
   */
  public async destroy(id: number) {
    const checkItem = await this.findOne(id);

    return await this.mstReasonRepo.delete({ id: checkItem.id });
  }
}
