import { Controller, HttpStatus, Post, Res, Get, Delete, Query, Param, Body, Put, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { IAuth } from "src/core/interface";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AppGuard } from "src/core/guard";
import { InspectionTypeCommentService } from "./inspection-type-comment.service";
import {
  CreateInspectionTypeCommentDto,
  IndexInspectionTypeCommentDto,
  UpdateInspectionTypeCommentDto,
} from "./inspection-type-comment.dto";

@ApiTags("[IC-6160] - Inspection Type Comment")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("inspection-type-comments")
export class InspectionTypeCommentController {
  constructor(private readonly inspectionTypeCommentService: InspectionTypeCommentService) {}

  /**
   * IC-6160
   * @function index
   * @author nvtoan27101994@gmail.com
   * @param res
   * @url {baseUrl}/inspection-type-comments
   * @method GET
   */
  @Get("/")
  public async index(
    @Res() res: Response,
    @Query() filterRequest: IndexInspectionTypeCommentDto,
    @Pagination() pagination: IPaginateReq,
  ): Promise<any> {
    const items = await this.inspectionTypeCommentService.index(filterRequest, pagination);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: items,
    });
  }

  /**
   * IC-6161
   * @function detail
   * @author nvtoan27101994@gmail.com
   * @param res
   * @url {baseUrl}/inspection-type-comments
   * @method GET
   */
  @Get("/:id")
  public async findOne(@Res() res: Response, @Param("id") id: number): Promise<any> {
    const item = await this.inspectionTypeCommentService.findOne(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: item,
    });
  }

  /**
   * IC-6162
   * @functionName store
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param auth
   * @param param
   * @url {baseUrl}/inspection-type-comments
   * @method Post
   */
  @Post("/")
  public async store(@Res() res: Response, @Auth() auth: IAuth, @Body() param: CreateInspectionTypeCommentDto) {
    const result = await this.inspectionTypeCommentService.store(auth, param);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-6163
   * @functionName update
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param auth
   * @param param
   * @url {baseUrl}/inspection-type-comments/{id}
   * @method PUT
   */
  @Put("/:id")
  public async update(
    @Res() res: Response,
    @Auth() auth: IAuth,
    @Param("id") id: number,
    @Body() updateRequest: UpdateInspectionTypeCommentDto,
  ) {
    const result = await this.inspectionTypeCommentService.update(auth, id, updateRequest);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-6164
   * @functionName destroy
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param id
   * @url {baseUrl}/inspection-type-comments/{id}
   * @method DELETE
   */
  @Delete("/:id")
  public async destroy(@Res() res: Response, @Param("id") id: number) {
    const result = await this.inspectionTypeCommentService.destroy(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
