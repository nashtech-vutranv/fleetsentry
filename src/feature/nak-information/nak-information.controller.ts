import { Controller, HttpStatus, Res, Get, Query, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { NakInformationService } from "./nak-information.service";
import { IndexNakInformationDto } from "./nak-information.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AppGuard } from "src/core/guard";
import { IPaginateReq, Pagination } from "src/core/decorators";

@ApiTags("[IC-6410] - Nak Information")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("nak-information")
export class NakInformationController {
  constructor(private readonly nakInformationService: NakInformationService) {}

  /**
   * @function index
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param indexRequest
   * @url {baseUrl}/nak-information
   * @method GET
   */
  @Get()
  public async index(
    @Res() res: Response,
    @Query() filterRequest: IndexNakInformationDto,
    @Pagination() pagination: IPaginateReq,
  ): Promise<any> {
    const items = await this.nakInformationService.index(filterRequest, pagination);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: items,
    });
  }
}
