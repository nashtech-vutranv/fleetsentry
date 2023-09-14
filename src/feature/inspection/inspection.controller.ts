import { Controller, Get, HttpStatus, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { AppGuard } from "src/core/guard";
import { IAuth } from "src/core/interface";
import { FilterDto, InspectionDto } from "./dto";
import { InspectionService } from "./inspection.service";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";

@Controller("/inspections")
@UseGuards(AppGuard)
@ApiTags("[IC-3300] - Inspections")
@ApiBearerAuth()
export class InspectionController {
  constructor(private inspectionService: InspectionService) {}

  /**
   * IC-3300
   * @author vuducdung93@gmail.com
   * @param auth
   * @param query
   * @param paginateReq
   * @param res
   */
  @Get("/")
  @ApiOperation({ summary: "list inspections" })
  @ApiOkResponse({ type: InspectionDto, isArray: true })
  public async filter(
    @Auth() auth: IAuth,
    @Query() filterDto: FilterDto,
    @Pagination() paginateReq: IPaginateReq,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.inspectionService.filter(auth, paginateReq, filterDto);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
