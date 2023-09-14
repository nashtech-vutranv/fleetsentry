import { Controller, HttpStatus, Post, Res, Get, Delete, Query, Param, Body, Put, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { MstCarBodyTypeService } from "./mst-car-body-type.service";
import { CreateMstCarBodyTypeDto, IndexMstCarBodyTypeDto, UpdateMstCarBodyTypeDto } from "./mst-car-body-type.dto";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { IAuth } from "src/core/interface";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AppGuard } from "src/core/guard";

@ApiTags("[IC-6400] - [System] Car Body Type")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("system/car-body-types")
export class MstCarBodyTypeController {
  constructor(private readonly mstCarBodyTypeService: MstCarBodyTypeService) {}

  /**
   * IC-6400
   * @function index
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param filterRequest
   * @param pagination
   * @url {baseUrl}/master/car-body-types
   * @method GET
   */
  @Get("/")
  public async index(
    @Res() res: Response,
    @Query() filterRequest: IndexMstCarBodyTypeDto,
    @Pagination() pagination: IPaginateReq,
  ): Promise<any> {
    const items = await this.mstCarBodyTypeService.index(filterRequest, pagination);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: items,
    });
  }

  /**
   * IC-6401
   * @function detail
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param id
   * @url {baseUrl}/master/car-body-types/{id}
   * @method GET
   */
  @Get("/:id")
  public async findOne(@Res() res: Response, @Param("id") id: number): Promise<any> {
    const item = await this.mstCarBodyTypeService.findOne(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: item,
    });
  }

  /**
   * IC-6402
   * @functionName store
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param auth
   * @param param
   * @url {baseUrl}/master/car-body-types
   * @method Post
   */
  @Post("/")
  public async store(@Res() res: Response, @Auth() auth: IAuth, @Body() param: CreateMstCarBodyTypeDto) {
    const result = await this.mstCarBodyTypeService.store(auth, param);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-6403
   * @functionName update
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param auth
   * @param id
   * @param updateRequest
   * @url {baseUrl}/master/car-body-types/{id}
   * @method PUT
   */
  @Put("/:id")
  public async update(
    @Res() res: Response,
    @Auth() auth: IAuth,
    @Param("id") id: number,
    @Body() updateRequest: UpdateMstCarBodyTypeDto,
  ) {
    const result = await this.mstCarBodyTypeService.update(auth, id, updateRequest);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-6404
   * @functionName destroy
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param id
   * @url {baseUrl}/master/car-body-types/{id}
   * @method DELETE
   */
  @Delete("/:id")
  public async destroy(@Res() res: Response, @Param("id") id: number) {
    const result = await this.mstCarBodyTypeService.destroy(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
