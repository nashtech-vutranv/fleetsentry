import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppException } from "src/core/exceptions";
import { InspectionTypeEntity, MultiInspectionTypeEntity } from "src/entities";
import { ErrorCode, Mode } from "src/enums";
import { Paginate, convertMinuteToTime } from "src/utils";
import { Repository } from "typeorm";
import { IPaginateReq } from "src/core/decorators";
import { IAuth } from "src/core/interface";
import { CreateMultiTypeDto, UpdateMultiTypeDto } from "./multiTypes.dto";
import { CreateCombineTypeDto, UpdateCombineTypeDto } from "./combineType.dto";

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(InspectionTypeEntity) private inspectionTypeRepo: Repository<InspectionTypeEntity>,
    @InjectRepository(MultiInspectionTypeEntity) private multiInspectionTypeRepo: Repository<MultiInspectionTypeEntity>,
  ) {}

  public async filter(pagination: IPaginateReq, sort: any, search: string): Promise<any> {
    const { page, size } = pagination;
    const take = size;
    const skip = (page - 1) * size;

    const queryBuilder = this.inspectionTypeRepo.createQueryBuilder("inspection_types");
    if (sort) {
      queryBuilder.orderBy("inspection_types.category_code", sort);
    }
    if (search) {
      queryBuilder.where("inspection_types.category_code LIKE :search", {
        search: `%${search}%`,
      });
    }
    const [items, total] = await queryBuilder.take(take).skip(skip).getManyAndCount();

    return new Paginate(items, total, page, size);
  }

  public async getAll(): Promise<InspectionTypeEntity[]> {
    return await this.inspectionTypeRepo.find();
  }

  public async listInspectionType(): Promise<InspectionTypeEntity[]> {
    return await this.inspectionTypeRepo.find({ where: { mode: 1 } });
  }

  public async findOne(id: number): Promise<InspectionTypeEntity> {
    const obj = await this.inspectionTypeRepo.findOne({ relations: ["multiInspectionType"], where: { id: id } });
    if (!obj) throw new AppException(ErrorCode.E111000);
    return obj;
  }

  public async create(
    auth: IAuth,
    typeObj: CreateCombineTypeDto,
  ): Promise<InspectionTypeEntity | MultiInspectionTypeEntity> {
    if (typeObj.mode == Mode.Single) {
      const newType = {
        ...typeObj.singleType,
        mode: Mode.Single,
        estimated_time: convertMinuteToTime(typeObj.singleType.estimated_time),
        company_code: auth.company_code,
        created_by: auth.id,
        updated_by: auth.id,
      };
      //check to exist of inspection type with company_code and inspection_code
      const isExist = await this.findInType(newType.company_code, newType.inspection_code);
      if (isExist) throw new AppException(ErrorCode.E111001);
      return await this.inspectionTypeRepo.save(this.inspectionTypeRepo.create(newType));
    } else {
      return await this.createMultiType(auth, typeObj.multiType);
    }
  }

  public async createMultiType(auth: IAuth, multiTypeObj: CreateMultiTypeDto): Promise<MultiInspectionTypeEntity> {
    const newType = {
      inspection_code: multiTypeObj.inspection_name,
      mode: Mode.Combine,
      company_code: auth.company_code,
      created_by: auth.id,
      updated_by: auth.id,
    };
    //check to exist of inspection type with company_code and inspection_code
    const checkExist = await this.findInType(newType.company_code, newType.inspection_code);
    if (checkExist) throw new AppException(ErrorCode.E111001);
    //check to exist of multi inspection type with key_types
    const isExist = await this.findInMultiType(
      multiTypeObj.inspection_type_id_1 + "_" + multiTypeObj.inspection_type_id_2,
    );
    if (isExist) throw new AppException(ErrorCode.E111002);

    const createInsType = await this.inspectionTypeRepo.save(this.inspectionTypeRepo.create(newType));
    const newMultiType = {
      ...multiTypeObj,
      inspection_type_id: createInsType.id,
      key_types: multiTypeObj.inspection_type_id_1 + "_" + multiTypeObj.inspection_type_id_2,
      company_code: auth.company_code,
      created_by: auth.id,
      updated_by: auth.id,
    };

    return await this.multiInspectionTypeRepo.save(this.multiInspectionTypeRepo.create(newMultiType));
  }

  public async update(auth: IAuth, id: number, typeObj: UpdateCombineTypeDto): Promise<any> {
    if (typeObj.mode == Mode.Single) {
      await this.findOne(id);
      const newType = {
        ...typeObj.singleType,
        estimated_time: convertMinuteToTime(typeObj.singleType.estimated_time),
        company_code: auth.company_code,
        updated_by: auth.id,
      };
      //check to exist of inspection type with company_code and inspection_code
      const checkExist = await this.findInType(newType.company_code, newType.inspection_code);
      if (checkExist && checkExist.id != id) throw new AppException(ErrorCode.E111001);

      return await this.inspectionTypeRepo.update({ id }, newType);
    } else {
      return await this.updateMultiType(auth, id, typeObj.multiType);
    }
  }

  public async updateMultiType(auth: IAuth, id: number, multiTypeObj: UpdateMultiTypeDto): Promise<any> {
    await this.findMultiTypeById(id);
    // delete multiTypeObj.mode;
    delete multiTypeObj.inspection_name;
    const newMultiType = {
      ...multiTypeObj,
      key_types: multiTypeObj.inspection_type_id_1 + "_" + multiTypeObj.inspection_type_id_2,
      company_code: auth.company_code,
      updated_by: auth.id,
    };
    //check to exist of multi inspection type with key_types
    const isExist = await this.findInMultiType(newMultiType.key_types);
    if (isExist && isExist.id != id) throw new AppException(ErrorCode.E111002);
    return await this.multiInspectionTypeRepo.update({ id }, newMultiType);
  }

  public async deleteOne(id: number): Promise<any> {
    const obj = await this.findOne(id);
    return await this.inspectionTypeRepo.softDelete({ id: obj.id });
  }

  public async findInMultiType(key_types: string): Promise<MultiInspectionTypeEntity> {
    const obj = await this.multiInspectionTypeRepo.findOne({ where: { key_types: key_types } });
    return obj;
  }

  public async findInType(company_code: string, inspection_code: string): Promise<InspectionTypeEntity> {
    const obj = await this.inspectionTypeRepo.findOne({
      where: { company_code: company_code, inspection_code: inspection_code },
    });
    return obj;
  }

  public async findMultiTypeById(id: number): Promise<MultiInspectionTypeEntity> {
    const obj = await this.multiInspectionTypeRepo.findOne({ where: { id: id } });
    if (!obj) throw new AppException(ErrorCode.E111003);
    return obj;
  }
}
