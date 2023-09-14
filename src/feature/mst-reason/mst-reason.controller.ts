import { Controller, HttpStatus, Post, Res, Get, Delete, Query, Param, Body, Put, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { IAuth } from "src/core/interface";
import { AppGuard } from "src/core/guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { MstReasonService } from "./mst-reason.service";
import { CreateMstReasonDto, IndexMstReasonDto, UpdateMstReasonDto } from "./mst-reason.dto";

@ApiTags("[IC-6150] - Mst Reason")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("mst-reasons")
export class MstReasonController {
  constructor(private readonly mstReasonService: MstReasonService) {}

  /**
   * IC-6150
   * @function index
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param filterRequest
   * @param pagination
   * @url {baseUrl}/mst-reasons
   * @method GET
   */
  @Get("/")
  public async index(
    @Res() res: Response,
    @Query() filterRequest: IndexMstReasonDto,
    @Pagination() pagination: IPaginateReq,
  ): Promise<any> {
    const items = await this.mstReasonService.index(filterRequest, pagination);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: items,
    });
  }

  /**
   * IC-6151
   * @function detail
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param id
   * @url {baseUrl}/mst-reasons
   * @method GET
   */
  @Get("/:id")
  public async findOne(@Res() res: Response, @Param("id") id: number): Promise<any> {
    const item = await this.mstReasonService.findOne(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: item,
    });
  }

  /**
   * IC-6152
   * @functionName store
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param auth
   * @param param
   * @url {baseUrl}/mst-reasons
   * @method Post
   */
  @Post("/")
  public async store(@Res() res: Response, @Auth() auth: IAuth, @Body() param: CreateMstReasonDto) {
    const result = await this.mstReasonService.store(auth, param);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-6153
   * @functionName update
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param auth
   * @param id
   * @param updateRequest
   * @url {baseUrl}/mst-reasons/{id}
   * @method PUT
   */
  @Put("/:id")
  public async update(
    @Res() res: Response,
    @Auth() auth: IAuth,
    @Param("id") id: number,
    @Body() updateRequest: UpdateMstReasonDto,
  ) {
    const result = await this.mstReasonService.update(auth, id, updateRequest);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-6154
   * @functionName destroy
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param id
   * @url {baseUrl}/mst-reasons/{id}
   * @method DELETE
   */
  @Delete("/:id")
  public async destroy(@Res() res: Response, @Param("id") id: number) {
    const result = await this.mstReasonService.destroy(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
