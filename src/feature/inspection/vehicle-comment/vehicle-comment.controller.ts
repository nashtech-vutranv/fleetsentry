import { Body, Controller, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AppGuard } from "src/core/guard";
import { VehicleCommentService } from "./vehicle-comment.service";
import { Auth } from "src/core/decorators";
import { IAuth } from "src/core/interface";
import { CreateVehicleCommentDto } from "./vehicle-comment.dto";
import { Response } from "express";

@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("/inspection/vehicle-comments")
export class VehicleCommentController {
  constructor(private readonly vehicleCommentService: VehicleCommentService) {}

  @Post()
  public async create(
    @Res() res: Response,
    @Auth() auth: IAuth,
    @Body() vehicleCommentBody: CreateVehicleCommentDto,
  ): Promise<any> {
    const result = await this.vehicleCommentService.create(auth, vehicleCommentBody);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result ?? null,
    });
  }
}
