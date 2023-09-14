import { Controller, Get, HttpStatus, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { AppGuard } from "src/core/guard";
import { IAuth } from "src/core/interface";
import { NotificationUserDto } from "./notification.dto";
import { NotificationService } from "./notification.service";
@Controller("notifications")
@UseGuards(AppGuard)
@ApiTags("[ME-TOP] - Notification")
@ApiBearerAuth()
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get("")
  @ApiOperation({ summary: "list role-masters" })
  @ApiOkResponse({
    type: NotificationUserDto,
  })
  public async filterME(
    @Auth() auth: IAuth,
    @Pagination() paginateReq: IPaginateReq,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.notificationService.filterME(auth, paginateReq);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
