import { DownloadCsvService } from "./../setting-inspection/types/downloadCsv.service";
import { Body, Controller, Get, Param, Put, Res, UseGuards } from "@nestjs/common";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { ParameterService } from "./parameter.service";
import { IAuth } from "src/core/interface";
import { ParameterDto } from "./system-parameter.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AppGuard } from "src/core/guard";
import { Response } from "express";

@ApiTags("[IC-9900] - [System] Parameter")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("system/parameters")
export class ParameterController {
  constructor(private parameterService: ParameterService, private downloadCsvService: DownloadCsvService) {}

  @Get()
  findAll(@Pagination() query: IPaginateReq) {
    return this.parameterService.findAll(query);
  }

  @Get("download")
  public async download(@Res() res: Response) {
    const results = await this.parameterService.getAll();
    return await this.downloadCsvService.downloadCsv(res, results, "parameters");
  }

  @Get(":id")
  index(@Param("id") id: number) {
    return this.parameterService.index(id);
  }

  @Put(":id")
  public async updateById(@Auth() auth: IAuth, @Param("id") id: number, @Body() body: ParameterDto) {
    return this.parameterService.updateById(auth, id, body);
  }
}
