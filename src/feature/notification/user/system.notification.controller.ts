import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { AppGuard } from "src/core/guard";
import { IAuth } from "src/core/interface";
import { CreateNotificationDto } from "./dto/createDto";
import { GetListNotificationsDto } from "./dto/filterDto";
import { UpdateNotificationDto } from "./dto/updateDto";
import { NotificationService } from "./notification.service";
@Controller("system/notifications")
@UseGuards(AppGuard)
@ApiTags("[IC6700] - Notification")
@ApiBearerAuth()
export class SystemNotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "create notification" })
  async create(@Body() createNotificationDto: CreateNotificationDto, @Auth() auth: IAuth, @Res() res: Response) {
    const notification = await this.notificationService.create(auth, createNotificationDto);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: notification,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "get list notification" })
  async filter(@Query() query: GetListNotificationsDto, @Pagination() pagination: IPaginateReq, @Res() res: Response) {
    const notifications = await this.notificationService.filter(query, pagination);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: notifications || [],
    });
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "get detail notification" })
  async findOne(@Param("id") id: number, @Res() res: Response) {
    const notification = await this.notificationService.findOne(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: notification || {},
    });
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "update notification" })
  async update(
    @Param("id") id: number,
    @Body() updateNotificationDto: UpdateNotificationDto,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const notification = await this.notificationService.update(auth, id, updateNotificationDto);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: notification,
    });
  }
}
