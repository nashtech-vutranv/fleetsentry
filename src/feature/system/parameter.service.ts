import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginateReq } from "src/core/decorators";
import { AppException } from "src/core/exceptions";
import { SystemParameterEntity } from "src/entities/SystemParameter.entity";
import { ErrorCode } from "src/enums";
import { Paginate } from "src/utils/paginate";
import { Repository } from "typeorm";
import { ParameterDto } from "./system-parameter.dto";
import { IAuth } from "src/core/interface";

@Injectable()
export class ParameterService {
  constructor(
    @InjectRepository(SystemParameterEntity) private systemParameterRepository: Repository<SystemParameterEntity>,
  ) {}

  async findAll(query: IPaginateReq) {
    const take = query.size;
    const page = query.page;
    const skip = (page - 1) * take;

    const [data, total] = await this.systemParameterRepository.findAndCount({
      where: {},
      take: take,
      skip: skip,
    });

    const result = new Paginate(data, total, page, take);
    return result;
  }

  public async getAll(): Promise<SystemParameterEntity[]> {
    return await this.systemParameterRepository.find();
  }

  async index(id: number): Promise<SystemParameterEntity> {
    const systemParameter = await this.systemParameterRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!systemParameter) {
      throw new AppException(ErrorCode.E201003);
    }
    return systemParameter;
  }

  async updateById(auth: IAuth, id: number, parameterBody: ParameterDto): Promise<SystemParameterEntity> {
    const systemParameter = await this.systemParameterRepository.findOne({ where: { id } });
    if (!systemParameter) throw new AppException(ErrorCode.E201003);

    // Update dto input
    delete parameterBody.id;
    delete parameterBody.created_by;
    parameterBody.updated_by = auth?.id;

    //Update parameter
    await this.systemParameterRepository.update(id, parameterBody);
    return this.systemParameterRepository.findOne({ where: { id } });
  }
}
