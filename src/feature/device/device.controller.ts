import { Controller, Post, Body, Headers, Res, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import * as jwt from "jsonwebtoken";
import { Response } from "express";
import { JwtConfig } from "src/constants/JwtConfig";
import { DeviceService } from "./device.service";
import { DeviceDto } from "./dto";

@ApiTags("Devices")
@Controller("devices")
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}
  getResponseResults(res: Response, result: any) {
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Post("register")
  @ApiOperation({ summary: "Register devices" })
  async registerDevice(
    @Res() res: Response,
    @Headers("authorization") authorization: string,
    @Body() deviceDto: DeviceDto,
  ) {
    if (!authorization) {
      const result = await this.deviceService.registerDeviceWithoutToken(deviceDto);
      return this.getResponseResults(res, result);
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      const result = await this.deviceService.registerDeviceWithoutToken(deviceDto);
      return this.getResponseResults(res, result);
    }
    if (token) {
      try {
        jwt.verify(token, JwtConfig.secret);
        const result = await this.deviceService.registerDeviceWithToken(deviceDto);
        return this.getResponseResults(res, result);
      } catch (error) {
        const result = await this.deviceService.registerDeviceWithoutToken(deviceDto);
        return this.getResponseResults(res, result);
      }
    }
  }
}
