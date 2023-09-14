import { Body, Controller, Get, Param, Put, Query, Res, UseGuards } from "@nestjs/common";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { IAuth } from "src/core/interface";
import { AppGuard } from "src/core/guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { LanguageLabelService } from "./language-label.service";
import { LanguageLabelDto } from "./dto/language-label.dto";
import { FilterLanguageLabelDto } from "./dto/filter-language-label.dto";
import { Response } from "express";

@ApiTags("[IC-9700] - [System] Languages Label")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("system/language-labels")
export class LanguageLabelController {
  constructor(private languageLabelService: LanguageLabelService) {}

  @Get()
  public filter(@Pagination() paginate: IPaginateReq, @Query() filter: FilterLanguageLabelDto) {
    return this.languageLabelService.filter(paginate, filter);
  }

  @Get("download")
  public download(@Res() res: Response, @Query() filter: FilterLanguageLabelDto) {
    return this.languageLabelService.downloadCsv(res, filter);
  }

  @Get(":id")
  public show(@Param("id") id: number) {
    return this.languageLabelService.findOne(id);
  }

  @Put(":id")
  public updateById(@Auth() auth: IAuth, @Param("id") id: number, @Body() body: LanguageLabelDto) {
    return this.languageLabelService.updateById(auth, id, body);
  }
}
