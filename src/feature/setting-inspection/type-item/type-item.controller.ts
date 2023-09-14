import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { TypeItemService } from "./type-item.service";
import { Auth } from "src/core/decorators";
import { IAuth } from "src/core/interface";
import { AppGuard } from "src/core/guard";
import { StoreBody } from "./type-item.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("[IC-6110] - [Setting Ins] - type-item")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("setting-inspection/type-item")
export class TypeItemController {
  constructor(private readonly typeItemService: TypeItemService) {
  }

  /**
   * IC-6110
   * @author vungpv93@gmail.com
   * @param res
   * @param auth
   */
  @Get("/")
  public async index(@Res() res: Response, @Auth() auth: IAuth) {
    const result = await this.typeItemService.all(auth, 1);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-6110
   * @author vungpv93@gmail.com
   * @param res
   * @param auth
   * @param body
   */
  @Post("/")
  public async store(@Res() res: Response, @Auth() auth: IAuth, @Body() body: StoreBody) {
    const result = await this.typeItemService.store(auth, body);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
