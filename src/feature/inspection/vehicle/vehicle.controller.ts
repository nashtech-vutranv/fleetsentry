import { Controller, Get, Param, Res, UseGuards, HttpStatus, Put, Body } from "@nestjs/common";
import { Response } from "express";
import { Auth } from "src/core/decorators";
import { AppGuard } from "src/core/guard";
import { IAuth } from "src/core/interface";
import { VehicleService } from "./vehicle.service";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { UpdateVehicalDto, VehicleDetailDto } from "./dto";

@Controller("/inspection/vehicles")
@UseGuards(AppGuard)
@ApiTags("[inspection] - vehicles")
@ApiBearerAuth()
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  /**
   * IC3100
   * @author vuducdung93@gmail.com
   * @url {baseUrl}/inspection/vehicles/:id
   * @function show
   * @param id: order_number
   */
  @Get("/:order_number")
  @ApiOperation({ summary: "list inspections of a car" })
  @ApiOkResponse({
    type: VehicleDetailDto,
  })
  public async show(@Param("order_number") id: string, @Auth() auth: IAuth, @Res() res: Response): Promise<any> {
    const result = await this.vehicleService.findOne(auth, id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC3100
   * @author vuducdung93@gmail.com
   * @url {baseUrl}/inspection/vehicles/:id
   * @function update
   * @param id: order_number
   */
  @Put("/:order_number")
  @ApiOperation({ summary: "update status of inspections in a car" })
  @ApiOkResponse({ type: VehicleDetailDto })
  public async update(
    @Param("order_number") id: string,
    @Body() body: UpdateVehicalDto,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.vehicleService.update(auth, id, body);

    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
