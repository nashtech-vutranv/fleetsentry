import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginateReq } from "src/core/decorators";
import { Paginate } from "src/utils/paginate";
import { Repository } from "typeorm";
import { InputItemEntity } from "src/entities/InputItem.entity";
import { FilterInputItemDto } from "./dto/filter-input-item.dto";
import * as _ from "lodash";
import { DownloadCsvService } from "../setting-inspection/types/downloadCsv.service";
import { Response } from "express";

@Injectable()
export class InputItemService {
  constructor(
    @InjectRepository(InputItemEntity)
    private inputItemRepository: Repository<InputItemEntity>,
    private downloadCsvService: DownloadCsvService,
  ) {}

  public async filter(
    paginate: IPaginateReq,
    filter: FilterInputItemDto,
    skipPagination = false,
  ): Promise<[InputItemEntity[], number] | Paginate> {
    let whereQuery: any = {
      query: "",
      param: {},
    };

    if (!_.isEmpty(filter)) {
      whereQuery = {
        query: "CONCAT(company_code, ' ', input_field_name,' ', data_type, ' ', list_key_code) like :search",
        param: {
          search: `%${filter.q?.trim() ?? ""}%`,
        },
      };

      if (filter.company_code) {
        whereQuery.query = whereQuery.query + " AND company_code = :companyCode";
        whereQuery.param.companyCode = filter.company_code;
      }

      if (filter.data_type) {
        whereQuery.query = whereQuery.query + " AND data_type = :dataType";
        whereQuery.param.dataType = filter.data_type;
      }

      if (filter.input_field_name) {
        whereQuery.query = whereQuery.query + " AND input_field_name = :inputFieldName";
        whereQuery.param.inputFieldName = filter.input_field_name;
      }
    }

    // Skip paginate
    if (skipPagination) {
      const inputItemQuery = await this.inputItemRepository
        .createQueryBuilder("mst_input_item")
        .where(whereQuery.query, whereQuery.param);
      return inputItemQuery.getManyAndCount();
    }

    // Paginate
    const take = paginate.size;
    const page = paginate.page;
    const skip = (page - 1) * take;

    const inputItemQuery = await this.inputItemRepository
      .createQueryBuilder("mst_input_item")
      .where(whereQuery.query, whereQuery.param)
      .take(take)
      .skip(skip);

    const [data, total] = await inputItemQuery.getManyAndCount();
    return new Paginate(data, total, page, take);
  }

  public async downloadCsv(res: Response, filter: FilterInputItemDto) {
    const inputItems = await this.filter(null, filter, true);
    return this.downloadCsvService.downloadCsv(res, inputItems[0], "inputItems");
  }
}
