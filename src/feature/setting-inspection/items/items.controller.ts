import { Controller, HttpStatus, Res, Get, Param, Delete, Post, Body, UseGuards, Put } from "@nestjs/common";
import { Response } from "express";
import { ItemsService } from "./items.service";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { CreateBody, UpdateBody } from "./items.dto";
import { AppGuard } from "src/core/guard";
import { IAuth } from "src/core/interface";
import { MstInspectionItemEntity } from "src/entities";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateResult } from "typeorm";

@ApiTags("[IC-6000] - [Setting Ins] - items")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("/setting-inspection/items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  /**
   * IC-6000
   * @functionName index
   * @author vungpv93@gmail.com
   * @param res
   * @param pagination
   * @url {baseUrl}/setting-inspection/items
   * @method GET
   */
  @Get("/")
  public async index(@Res() res: Response, @Pagination() pagination: IPaginateReq) {
    const result = await this.itemsService.filter(pagination);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-6001
   * @functionName show
   * @author vungpv93@gmail.com
   * @param res
   * @param id
   * @url {baseUrl}/setting-inspection/items/{id}
   * @method GET
   */
  @Get("/:id")
  public async show(@Res() res: Response, @Param("id") id: number) {
    const result: MstInspectionItemEntity = await this.itemsService.findOne(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-6001
   * @functionName store
   * @author vungpv93@gmail.com
   * @param res
   * @param auth
   * @param param
   * @url {baseUrl}/setting-inspection/items/{id}
   * @method GET
   * @example
   * 1. TYPE : 1
   * {
   *    "min_digits": 1,
   *    "max_digits": 3,
   *    "decimal_point_digits": 2,
   *    "unit": "mm"
   * }
   */
  @Post("/")
  public async store(@Res() res: Response, @Auth() auth: IAuth, @Body() param: CreateBody) {
    const result: MstInspectionItemEntity = await this.itemsService.store(auth, param);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-6001
   * @functionName update
   * @author vungpv93@gmail.com
   * @param res
   * @param auth
   * @param id
   * @param param
   */
  @Put("/:id")
  public async update(@Res() res: Response, @Auth() auth: IAuth, @Param("id") id: number, @Body() param: UpdateBody) {
    const result: MstInspectionItemEntity = await this.itemsService.update(auth, id, param);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-6001
   * @functionName destroy
   * @author vungpv93@gmail.com
   * @param res
   * @param id
   * @url {baseUrl}/setting-inspection/items/{id}
   * @method DELETE
   */
  @Delete("/:id")
  public async destroy(@Res() res: Response, @Param("id") id: number): Promise<any> {
    const result: UpdateResult = await this.itemsService.destroy(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
