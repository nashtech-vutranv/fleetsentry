import { Controller, Get, Query, Res, UseGuards } from "@nestjs/common";
import { IPaginateReq, Pagination } from "src/core/decorators";
import { InputItemService } from "./input-item.service";
import { AppGuard } from "src/core/guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FilterInputItemDto } from "./dto/filter-input-item.dto";
import { Response } from "express";

@ApiTags("InputItem")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("input_item")
export class InputItemController {
  constructor(private inputItemService: InputItemService) {}

  @Get()
  public filter(@Pagination() paginate: IPaginateReq, @Query() filter: FilterInputItemDto) {
    return this.inputItemService.filter(paginate, filter);
  }

  @Get("download")
  public download(@Res() res: Response, @Query() filter: FilterInputItemDto) {
    return this.inputItemService.downloadCsv(res, filter);
  }
}
