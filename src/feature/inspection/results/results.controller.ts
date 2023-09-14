import { Controller, Get, Param, Res, UseGuards, HttpStatus, Post, Body } from "@nestjs/common";
import { Response } from "express";
import { Auth } from "src/core/decorators";
import { AppGuard } from "src/core/guard";
import { IAuth } from "src/core/interface";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { ResultsService } from "./results.service";
import { StoreDto } from "./results.dto";

@Controller("/inspection/results")
@UseGuards(AppGuard)
@ApiTags("[IC-3110] - Inspection Schedule Result")
@ApiBearerAuth()
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  /**
   * @functionName show
   * @author vungpv93@gmail.com
   * @param res
   * @param auth
   * @param id
   * @url {baseUrl}/inspection/results/:id
   */
  @Get(":id")
  public async show(@Res() res: Response, @Auth() auth: IAuth, @Param("id") id: number) {
    const result = await this.resultsService.findInsScheduleResult(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Post("/")
  public async store(@Res() res: Response, @Auth() auth: IAuth, @Body() body: StoreDto): Promise<any> {
    const result: any = await this.resultsService.save(body.inspection_schedule_result_id, body.items, body.insResult);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
