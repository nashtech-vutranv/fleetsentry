import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginateReq } from "src/core/decorators";
import { AppException } from "src/core/exceptions";
import { GenericCodeEntity } from "src/entities";
import { ErrorCode } from "src/enums";
import { Paginate } from "src/utils/paginate";
import { In, Repository } from "typeorm";
import { GenericCodeDto } from "./dto/generic-code.dto";
import { IAuth } from "src/core/interface";
import { FilterGenericCodeDto } from "./dto/filter-generic-code.dto";
import * as _ from "lodash";
import { DownloadCsvService } from "../setting-inspection/types/downloadCsv.service";
import { Response } from "express";

@Injectable()
export class GenericCodeService {
  constructor(
    @InjectRepository(GenericCodeEntity)
    private genericCodeRepository: Repository<GenericCodeEntity>,
    private downloadCsvService: DownloadCsvService,
  ) {}

  public async filter(
    paginate: IPaginateReq,
    filter: FilterGenericCodeDto,
    skipPagination = false,
  ): Promise<[GenericCodeEntity[], number] | Paginate> {
    let whereQuery: any = {
      query: "",
      param: {},
    };

    if (!_.isEmpty(filter)) {
      whereQuery = {
        query:
          "CONCAT(company_code, ' ', key_type,' ', key_value, ' ', attribute1,' ', attribute2, ' ', attribute3, ' ', language)  like :search",
        param: {
          search: `%${filter.q?.trim() ?? ""}%`,
        },
      };

      if (filter.company_code) {
        whereQuery.query = whereQuery.query + " AND company_code = :companyCode";
        whereQuery.param.companyCode = filter.company_code;
      }

      if (filter.key_type) {
        whereQuery.query = whereQuery.query + " AND key_type = :keyType";
        whereQuery.param.keyType = filter.key_type;
      }

      if (filter.attribute) {
        whereQuery.query =
          whereQuery.query + " AND (attribute1 = :attribute OR attribute2 = :attribute OR attribute3 = :attribute)";
        whereQuery.param.attribute = filter.attribute;
      }
    }

    // Skip paginate
    if (skipPagination) {
      const genericCodeQuery = await this.genericCodeRepository
        .createQueryBuilder("mst_generic_code")
        .where(whereQuery.query, whereQuery.param);
      return genericCodeQuery.getManyAndCount();
    }

    // Paginate
    const take = paginate.size;
    const page = paginate.page;
    const skip = (page - 1) * take;

    const genericCodeQuery = await this.genericCodeRepository
      .createQueryBuilder("mst_generic_code")
      .where(whereQuery.query, whereQuery.param)
      .take(take)
      .skip(skip);

    const [data, total] = await genericCodeQuery.getManyAndCount();
    return new Paginate(data, total, page, take);
  }

  public async findOne(id: number): Promise<GenericCodeEntity> {
    const genericCode = await this.genericCodeRepository.findOne({
      where: { id: id },
    });

    if (!genericCode) throw new AppException(ErrorCode.E201002);
    return genericCode;
  }

  /**
   * @functionName updateById
   * @param auth
   * @param id
   * @param genericCodeBody
   */
  public async updateById(auth: IAuth, id: number, genericCodeBody: GenericCodeDto): Promise<GenericCodeEntity> {
    const entity = await this.findOne(id);

    return await this.genericCodeRepository.save(
      this.genericCodeRepository.create({
        ...entity,
        ...genericCodeBody,
        updated_by: auth.id,
      }),
    );
  }

  /**
   * @functionName global check GenericCode by Company, Language, KeyType and Value is valid ?
   * @param condition
   */
  public async findOneByCondition(condition: {
    company_code: string;
    language: string;
    key_type: string;
    key_value: string;
  }): Promise<GenericCodeEntity> {
    const entity = await this.genericCodeRepository.findOne({
      where: {
        company_code: condition.company_code,
        language: condition.language,
        key_type: condition.key_type,
        key_value: condition.key_value,
      },
    });

    if (!entity) throw new AppException(ErrorCode.E201002);

    return entity;
  }

  public async downloadCsv(res: Response, filter: FilterGenericCodeDto) {
    const genericCodes = await this.filter(null, filter, true);
    return this.downloadCsvService.downloadCsv(res, genericCodes[0], "genericCodes");
  }

  public async getListByKeyType(keyLists: Array<any>) {
    const results = await this.genericCodeRepository.find({
      where: {
        company_code: "9300", // TODO [VungPV] - thay doi logic theo company_code
        language: "ja", // TODO [VungPV] - thay doi logic add ja
        key_type: In(keyLists),
      },
    });
    return _.groupBy(results, "key_type");
  }

  /**
   * @author vungpv93@gmail.com
   * @functionName get all key_type
   */
  public async getKeysAll(): Promise<any> {
    const data = await this.genericCodeRepository
      .createQueryBuilder("genericCode")
      .select("DISTINCT genericCode.key_type", "key_type")
      .orderBy("key_type", "ASC")
      .getRawMany();

    return data;
  }
}
