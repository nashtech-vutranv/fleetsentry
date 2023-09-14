import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AppGuard } from "src/core/guard";
import { InspectorScheduleService } from "./inspector_schedule.service";
import { IAuth } from "src/core/interface";
import { Response } from "express";
import { Auth } from "src/core/decorators";
import { CreateInsSchedulesDto } from "./dto";

@ApiTags("[IC-6310] - [IC-6320] - Inspector Schedule")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("/inspector/schedules")
export class InspectorScheduleController {
  constructor(private readonly insScheduleService: InspectorScheduleService) {}

  /**
   * IC6310
   * @function create many
   * @url {baseUrl}/inspector-schedule
   * @param auth
   * @param res
   * @param bodyInspectorSchedules
   * @method POST
   * @description Create many inspector schedule
   */
  @Post("/")
  public async createMany(
    @Auth() auth: IAuth,
    @Res() res: Response,
    @Body() bodyInspectorSchedules: CreateInsSchedulesDto,
  ): Promise<any> {
    const result = await this.insScheduleService.createMany(auth, bodyInspectorSchedules.items);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC6310
   * @function get inspector schedule monthly
   * @url {baseUrl}/inspector-schedule/monthly
   * @param auth
   * @param res
   * @param inspectorId
   * @param fromDate
   * @param toDate
   * @method GET
   * @description Get inspector schedule monthly
   */
  @Get("/monthly")
  public async getInspectorScheduleMonthly(
    @Auth() auth: IAuth,
    @Res() res: Response,
    @Query("inspectorId") inspectorId: number,
    @Query("fromDate") fromDate: string,
    @Query("toDate") toDate: string,
  ): Promise<any> {
    console.log("getInspectorScheduleMonthly", inspectorId, fromDate, toDate);
    const result = await this.insScheduleService.getInspectorScheduleMonthly(inspectorId, fromDate, toDate);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC6320 get inspector schedule weekly of all inspectors same company_code
   * @function get inspector schedule weekly
   * @url {baseUrl}/inspector-schedule/weekly
   * @param auth
   * @param res
   * @param fromDate
   * @param toDate
   * @param areaId
   * @method GET
   * @description Get inspector schedule weekly
   */
  @Get("/weekly")
  public async getInspectorScheduleWeekly(
    @Auth() auth: IAuth,
    @Res() res: Response,
    @Query("fromDate") fromDate: string,
    @Query("toDate") toDate: string,
    @Query("areaId") areaId: string,
  ): Promise<any> {
    console.log("getInspectorScheduleWeekly", fromDate, toDate, areaId);
    const result = await this.insScheduleService.getInspectorScheduleWeekly(areaId, fromDate, toDate);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
