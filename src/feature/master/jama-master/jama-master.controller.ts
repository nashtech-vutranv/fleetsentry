import { Controller, HttpStatus, Res, Get, Query, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JamaMasterService } from "./jama-master.service";
import { FilterDto } from "./jama-master.dto";
import { IPaginateReq, Pagination } from "src/core/decorators";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AppGuard } from "src/core/guard";

@ApiTags("Jama Master")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("jama-master")
export class JamaMasterController {
  constructor(private readonly jamaMasterService: JamaMasterService) {}

  /**
   * IC-6470
   * @function index
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param filterRequest
   * @param pagination
   * @url {baseUrl}/jama-master
   * @method GET
   */
  @Get("/")
  public async index(
    @Res() res: Response,
    @Query() filterRequest: FilterDto,
    @Pagination() pagination: IPaginateReq,
  ): Promise<any> {
    const items = await this.jamaMasterService.filter(filterRequest, pagination);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: items,
    });
  }
}
