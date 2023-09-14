import { Body, Controller, HttpStatus, Post, Res, UseGuards, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { ScheduleService } from "./schedule.service";
import { ScheduleBobyDto } from "./dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AppGuard } from "src/core/guard";

@ApiTags("Schedule")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("schedule")
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
  @Post("calendar/dates")
  public async getViewCalendarDates(
    @Body(new ValidationPipe()) body: ScheduleBobyDto,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.scheduleService.getViewCalendarDates(body);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Post("calendar/time")
  public async getViewCalendarTime(
    @Body(new ValidationPipe()) body: ScheduleBobyDto,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.scheduleService.getViewCalendarTime(body);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
