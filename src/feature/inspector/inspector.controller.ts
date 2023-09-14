import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Query, Res, UseGuards } from "@nestjs/common";
import { InspectorService } from "./inspector.service";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { IAuth } from "src/core/interface";
import { AppGuard } from "src/core/guard";
import { Response } from "express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { InspectorUpdateInputDto } from "./dto";

@ApiTags("Inspector")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("/inspector")
export class InspectorController {
  constructor(private readonly inspectorService: InspectorService) {}

  /**
   * IC6300
   * @function index
   * @url {baseUrl}/inspector
   * @param res
   * @param textSearch
   * @param pagination
   * @method GET
   * @description Get list inspector
   */
  @Get("/")
  public async index(
    @Res() res: Response,
    @Query("textSearch") textSearch: string,
    @Pagination() pagination: IPaginateReq,
  ): Promise<any> {
    const result = await this.inspectorService.filter(pagination, textSearch);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @function get by id
   * @url {baseUrl}/inspector/:id
   * @param auth
   * @param res
   * @param id
   * @method GET
   * @description Get inspector by id
   */
  @Get("/:id")
  public async getById(@Auth() auth: IAuth, @Res() res: Response, @Param("id") id: number): Promise<any> {
    const result = await this.inspectorService.getById(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @function delete by id
   * @url {baseUrl}/inspector/:id
   * @param auth
   * @param res
   * @param id
   * @method DELETE
   * @description Delete inspector by id
   */
  @Delete("/:id")
  public async deleteById(@Auth() auth: IAuth, @Res() res: Response, @Param("id") id: number): Promise<any> {
    const result = await this.inspectorService.deleteById(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @function update by id
   * @url {baseUrl}/inspector/:id
   * @param auth
   * @param res
   * @param id
   * @param inspectorBody
   * @method PUT
   * @description Update inspector by id
   */
  @Put(":id")
  public async updateById(
    @Auth() auth: IAuth,
    @Res() res: Response,
    @Param("id") id: number,
    @Body() inspectorBody: InspectorUpdateInputDto,
  ): Promise<any> {
    console.log("Function: updateById -> inspectorBody", inspectorBody, id);
    const result = await this.inspectorService.updateById(auth, id, inspectorBody);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
