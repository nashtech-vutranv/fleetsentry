import { Controller, HttpStatus, Post, Res, Get, Delete, Body, Put, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { CommonExceptionDayService } from "./commonExceptionDay.service";
import { Auth } from "src/core/decorators";
import { IAuth } from "src/core/interface";
import { ApiBearerAuth, ApiTags, ApiOperation } from "@nestjs/swagger";
import { AppGuard } from "src/core/guard";
import { CreateCommonExceptionDayDto, UpdateCommonExceptionDayDto } from "./dto";

@ApiTags("[IC-6210] - [System] Common exception day")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("system/common-exception-day")
export class CommonExceptionDayController {
  constructor(private readonly commonExceptionDayService: CommonExceptionDayService) {}

  @Get()
  @ApiOperation({ summary: "Get all common-exception-days" })
  public async getAll(@Res() res: Response): Promise<any> {
    const items = await this.commonExceptionDayService.getCommonExceptionDays();
    return res.status(HttpStatus.OK).json({
      status: true,
      data: items,
    });
  }

  @Post()
  @ApiOperation({ summary: "Create common-exception-days" })
  public async create(@Res() res: Response, @Auth() auth: IAuth, @Body() param: CreateCommonExceptionDayDto[]) {
    const result = await this.commonExceptionDayService.createCommonExceptionDays(auth, param);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Put()
  @ApiOperation({ summary: "Update common-exception-days" })
  public async update(@Res() res: Response, @Auth() auth: IAuth, @Body() param: UpdateCommonExceptionDayDto[]) {
    const result = await this.commonExceptionDayService.updateCommonExceptionDays(auth, param);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Delete()
  @ApiOperation({ summary: "Delete common-exception-days" })
  public async delete(@Res() res: Response, @Auth() auth: IAuth, @Body() param: number[]) {
    const result = await this.commonExceptionDayService.deleteCommonExceptionDays(auth, param);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
