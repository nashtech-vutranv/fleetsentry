import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarBodyTypeEntity } from "src/entities";
import { Repository } from "typeorm";
import { Paginate } from "src/utils";
import { CreateMstCarBodyTypeDto, IndexMstCarBodyTypeDto, UpdateMstCarBodyTypeDto } from "./mst-car-body-type.dto";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";
import { IAuth } from "src/core/interface";
import { plainToClass } from "class-transformer";
import { IPaginateReq } from "src/core/decorators";

@Injectable()
export class MstCarBodyTypeService {
  constructor(@InjectRepository(CarBodyTypeEntity) private mstCarBodyTypeRepo: Repository<CarBodyTypeEntity>) {}

  /**
   * @author nvtoan27101994@gmail.com
   * @functionName index
   * @description
   */
  public async index(filterRequest: IndexMstCarBodyTypeDto, pagination: IPaginateReq): Promise<any> {
    const queryBuilder = this.mstCarBodyTypeRepo
      .createQueryBuilder("mst_car_body_type")
      .select(["mst_car_body_type.*"]);

    if (filterRequest.id) {
      queryBuilder.andWhere({
        id: filterRequest.id,
      });
    }

    if (filterRequest.company_code) {
      queryBuilder.andWhere({
        company_code: filterRequest.company_code,
      });
    }

    if (filterRequest.type_of_model) {
      queryBuilder.andWhere({
        type_of_model: filterRequest.type_of_model,
      });
    }

    if (filterRequest.maker) {
      queryBuilder.andWhere({
        maker: filterRequest.maker,
      });
    }

    if (filterRequest.type_classification_start) {
      queryBuilder.andWhere({
        type_classification_start: filterRequest.type_classification_start,
      });
    }

    if (filterRequest.type_classification_end) {
      queryBuilder.andWhere({
        type_classification_end: filterRequest.type_classification_end,
      });
    }

    if (filterRequest.car_model_lower_limit) {
      queryBuilder.andWhere({
        car_model_lower_limit: filterRequest.car_model_lower_limit,
      });
    }

    if (filterRequest.car_model_upper_limit) {
      queryBuilder.andWhere({
        car_model_upper_limit: filterRequest.car_model_upper_limit,
      });
    }

    if (filterRequest.fuel) {
      queryBuilder.andWhere({
        fuel: filterRequest.fuel,
      });
    }

    if (filterRequest.co2) {
      queryBuilder.andWhere({
        co2: filterRequest.co2,
      });
    }

    if (filterRequest.measurement_mode) {
      queryBuilder.andWhere({
        measurement_mode: filterRequest.measurement_mode,
      });
    }

    filterRequest.sortField = filterRequest.sortField || "id";

    const { page, size } = pagination;
    const take = size;
    const skip = (page - 1) * size;

    const [list, total] = await Promise.all([
      queryBuilder
        .orderBy(`mst_car_body_type.${filterRequest.sortField}`, filterRequest.sortType)
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
  public async findOne(id: number): Promise<CarBodyTypeEntity> {
    const item = await this.mstCarBodyTypeRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!item) throw new AppException(ErrorCode.E160000);

    return item;
  }

  /**
   * @functionName store
   * @author nvtoan27101994@gmail.com
   * @param auth
   * @param param
   * @rule
   */
  public async store(auth: IAuth, createRequest: CreateMstCarBodyTypeDto): Promise<CarBodyTypeEntity> {
    // TODO : Need check mst_car_body_type is valid
    // const checkItem = await this.mstCarBodyTypeRepo.findOne({
    //   where: {
    //     model: createRequest.model,
    //   },
    // });

    // if (!checkItem) throw new AppException(ErrorCode.E140001);

    const item = plainToClass(CarBodyTypeEntity, createRequest, {
      ignoreDecorators: true,
    });

    item.company_code = auth?.company_code || "1";
    item.created_by = auth?.id;
    item.updated_by = auth?.id;

    return await this.mstCarBodyTypeRepo.save(item);
  }

  /**
   * @functionName update
   * @author nvtoan27101994@gmail.com
   * @param auth
   * @param id
   * @param param
   * @rule
   */
  public async update(auth: IAuth, id: number, updateRequest: UpdateMstCarBodyTypeDto): Promise<CarBodyTypeEntity> {
    const checkItem = await this.findOne(id);

    const item = plainToClass(
      CarBodyTypeEntity,
      { ...checkItem, ...updateRequest },
      { ignoreDecorators: true, exposeUnsetFields: false },
    );

    item.updated_by = auth?.id;

    return await this.mstCarBodyTypeRepo.save(item);
  }

  /**
   * @functionName destroy
   * @author nvtoan27101994@gmail.com
   * @param id
   */
  public async destroy(id: number) {
    const checkItem = await this.findOne(id);

    return await this.mstCarBodyTypeRepo.delete({ id: checkItem.id });
  }
}
