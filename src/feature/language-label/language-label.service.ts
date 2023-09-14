import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginateReq } from "src/core/decorators";
import { AppException } from "src/core/exceptions";
import { LanguageLabelEntity } from "src/entities";
import { ErrorCode } from "src/enums";
import { Paginate } from "src/utils/paginate";
import { Repository } from "typeorm";
import { IAuth } from "src/core/interface";
import { FilterLanguageLabelDto } from "./dto/filter-language-label.dto";
import { LanguageLabelDto } from "./dto/language-label.dto";
import * as _ from "lodash";
import { DownloadCsvService } from "../setting-inspection/types/downloadCsv.service";
import { Response } from "express";

@Injectable()
export class LanguageLabelService {
  constructor(
    @InjectRepository(LanguageLabelEntity)
    private languageLabelRepository: Repository<LanguageLabelEntity>,
    private downloadCsvService: DownloadCsvService,
  ) {}

  public async filter(
    paginate: IPaginateReq,
    filter: FilterLanguageLabelDto,
    skipPagination = false,
  ): Promise<[LanguageLabelEntity[], number] | Paginate> {
    let whereQuery: any = {
      query: "",
      param: {},
    };

    if (!_.isEmpty(filter)) {
      whereQuery = {
        query: "CONCAT(company_code, ' ', key,' ', label)  like :search",
        param: {
          search: `%${filter.q?.trim() ?? ""}%`,
        },
      };

      if (filter.company_code) {
        whereQuery.query = whereQuery.query + " AND company_code = :companyCode";
        whereQuery.param.companyCode = filter.company_code;
      }

      if (filter.key) {
        whereQuery.query = whereQuery.query + " AND key = :key";
        whereQuery.param.key = filter.key;
      }
    }

    // Skip paginate
    if (skipPagination) {
      const languageLabelQuery = await this.languageLabelRepository
        .createQueryBuilder("mst_language_label")
        .where(whereQuery.query, whereQuery.param);
      return languageLabelQuery.getManyAndCount();
    }

    // Paginate
    const take = paginate.size;
    const page = paginate.page;
    const skip = (page - 1) * take;

    const languageLabelQuery = await this.languageLabelRepository
      .createQueryBuilder("mst_language_label")
      .where(whereQuery.query, whereQuery.param)
      .take(take)
      .skip(skip);

    const [data, total] = await languageLabelQuery.getManyAndCount();
    return new Paginate(data, total, page, take);
  }

  public async findOne(id: number): Promise<LanguageLabelEntity> {
    const languageLabel = await this.languageLabelRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!languageLabel) {
      throw new AppException(ErrorCode.E201004);
    }
    return languageLabel;
  }

  public async updateById(auth: IAuth, id: number, languageLabelBody: LanguageLabelDto): Promise<LanguageLabelEntity> {
    const languageLabel = await this.languageLabelRepository.findOne({ where: { id } });
    if (!languageLabel) throw new AppException(ErrorCode.E201004);

    // Update dto input
    delete languageLabelBody.id;
    delete languageLabelBody.created_by;
    languageLabelBody.updated_by = auth?.id;

    // company_code, key, lable not update
    languageLabelBody.company_code = languageLabel.company_code;
    languageLabelBody.key = languageLabel.key;
    languageLabelBody.label = languageLabel.label;

    //Update genericCode
    await this.languageLabelRepository.update(id, languageLabelBody);
    return this.languageLabelRepository.findOne({ where: { id } });
  }

  public async downloadCsv(res: Response, filter: FilterLanguageLabelDto) {
    const languageLabels = await this.filter(null, filter, true);
    return this.downloadCsvService.downloadCsv(res, languageLabels[0], "languageLabels");
  }
}
