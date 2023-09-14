import { Controller, HttpStatus, Res, Get, Query, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { LvisMasterService } from "./lvis-master.service";
import { FilterDto } from "./lvis-master.dto";
import { IPaginateReq, Pagination } from "src/core/decorators";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AppGuard } from "src/core/guard";

@ApiTags("Lvis Master")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("lvis-master")
export class LvisMasterController {
  constructor(private readonly lvisMasterService: LvisMasterService) {}

  /**
   * IC-6460
   * @function index
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param filterRequest
   * @param pagination
   * @url {baseUrl}/lvis-master
   * @method GET
   */
  @Get("/")
  public async index(
    @Res() res: Response,
    @Query() filterRequest: FilterDto,
    @Pagination() pagination: IPaginateReq,
  ): Promise<any> {
    const items = await this.lvisMasterService.filter(filterRequest, pagination);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: items,
    });
  }
}
