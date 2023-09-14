import { Body, Controller, Get, HttpStatus, Param, Put, Query, Res, UseGuards } from "@nestjs/common";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { GenericCodeService } from "./generic-code.service";
import { IAuth } from "src/core/interface";
import { AppGuard } from "src/core/guard";
import { GenericCodeDto } from "./dto/generic-code.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FilterGenericCodeDto } from "./dto/filter-generic-code.dto";
import { Response } from "express";
import { KeyTypeGenericCodeDto } from "./dto/keytype-generic-code.dto";

@ApiTags("[IC-9800] - GenericCodes")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("generic-codes")
export class GenericCodeController {
  constructor(private genericCodeService: GenericCodeService) {}

  @Get()
  public async filter(@Res() res: Response, @Pagination() paginate: IPaginateReq, @Query() filter: FilterGenericCodeDto) {
    const result = await this.genericCodeService.filter(paginate, filter);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Get("all")
  public async getListByKeyType(@Res() res: Response, @Query() filter: KeyTypeGenericCodeDto) {
    const keyLists = filter.keys.split(",").map(String);
    const result = await this.genericCodeService.getListByKeyType(keyLists);

    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Get("keys/all")
  public async getKeysAll(@Res() res: Response) {
    const result = await this.genericCodeService.getKeysAll();
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Get("download")
  public download(@Res() res: Response, @Query() filter: FilterGenericCodeDto) {
    return this.genericCodeService.downloadCsv(res, filter);
  }

  @Get(":id")
  public async show(@Res() res: Response, @Param("id") id: number) {
    const result = await this.genericCodeService.findOne(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Put(":id")
  public async updateById(
    @Res() res: Response,
    @Auth() auth: IAuth,
    @Param("id") id: number,
    @Body() body: GenericCodeDto,
  ) {
    const result = await this.genericCodeService.updateById(auth, id, body);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
