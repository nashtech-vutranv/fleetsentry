import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { TypeService } from "./types.service";
import { IAuth } from "src/core/interface";
import { AppGuard } from "src/core/guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DownloadCsvService } from "./downloadCsv.service";
import { CreateCombineTypeDto, UpdateCombineTypeDto } from "./combineType.dto";

@ApiTags("[IC-6100] - [Setting Ins] - types")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("setting-inspection/types")
export class TypeController {
  constructor(private readonly typeService: TypeService, private readonly downloadCsvService: DownloadCsvService) {}

  @Get()
  public async index(
    @Res() res: Response,
    @Pagination() pagination: IPaginateReq,
    @Query("sort") sort: "asc" | "desc",
    @Query("search") search = "",
  ) {
    const sortUpCase = sort.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const result = await this.typeService.filter(pagination, sortUpCase, search);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Get("list-inspection-type")
  public async listInspectionType(@Res() res: Response) {
    const result = await this.typeService.listInspectionType();
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Get("download")
  public async download(@Res() res: Response) {
    const results = await this.typeService.getAll();
    return await this.downloadCsvService.downloadCsv(res, results, "inspection_types");
  }

  @Get(":id")
  public async show(@Res() res: Response, @Param("id") id: number): Promise<any> {
    const result = await this.typeService.findOne(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Post()
  public async create(@Res() res: Response, @Auth() auth: IAuth, @Body() typeBody: CreateCombineTypeDto): Promise<any> {
    const result = await this.typeService.create(auth, typeBody);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Patch(":id")
  public async update(
    @Res() res: Response,
    @Auth() auth: IAuth,
    @Param("id") id: number,
    @Body() typeBody: UpdateCombineTypeDto,
  ): Promise<any> {
    const result = await this.typeService.update(auth, id, typeBody);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result ?? null,
    });
  }

  @Delete(":id")
  public async destroy(@Res() res: Response, @Param("id") id: number): Promise<any> {
    const result = await this.typeService.deleteOne(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result ?? null,
    });
  }
}
