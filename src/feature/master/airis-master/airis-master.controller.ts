import { Controller, HttpStatus, Res, Get, Query, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AirisMasterService } from "./airis-master.service";
import { FilterDto } from "./airis-master.dto";
import { IPaginateReq, Pagination } from "src/core/decorators";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AppGuard } from "src/core/guard";

@ApiTags("Airis Master")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("airis-master")
export class AirisMasterController {
  constructor(private readonly airisMasterService: AirisMasterService) {}

  /**
   * IC-6450
   * @function index
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param filterRequest
   * @param pagination
   * @url {baseUrl}/airis-master
   * @method GET
   */
  @Get("/")
  public async index(
    @Res() res: Response,
    @Query() filterRequest: FilterDto,
    @Pagination() pagination: IPaginateReq,
  ): Promise<any> {
    const result = await this.airisMasterService.filter(filterRequest, pagination);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
