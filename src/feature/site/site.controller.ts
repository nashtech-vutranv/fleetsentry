import {
  Controller,
  HttpStatus,
  Post,
  Res,
  Get,
  Delete,
  Query,
  Param,
  Body,
  Put,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { SiteService } from "./site.service";
import { CreateSiteDto, IndexSiteDto, UpdateSiteDto } from "./site.dto";
import { ScheduleBobyDto } from "src/feature/schedule/dto";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { IAuth } from "src/core/interface";
import { ApiBearerAuth, ApiTags, ApiOperation } from "@nestjs/swagger";
import { AppGuard } from "src/core/guard";

@ApiTags("Site")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("sites")
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  /**
   * IC-6200
   * @function index
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param indexRequest
   * @param pagination
   * @url {baseUrl}/sites
   * @method GET
   */
  @Get("/")
  public async index(
    @Res() res: Response,
    @Query() indexRequest: IndexSiteDto,
    @Pagination() pagination: IPaginateReq,
  ): Promise<any> {
    const items = await this.siteService.index(indexRequest, pagination);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: items,
    });
  }

  /**
   * IC-6201
   * @function detail
   * @author nvtoan27101994@gmail.com
   * @param res
   * @url {baseUrl}/sites
   * @method GET
   */
  @Get("/:id")
  public async findOne(@Res() res: Response, @Param("id") id: number): Promise<any> {
    const item = await this.siteService.findOne(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: item,
    });
  }

  /**
   * IC-6202
   * @functionName store
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param auth
   * @param param
   * @url {baseUrl}/sites
   * @method Post
   */
  @Post("/")
  public async store(@Res() res: Response, @Auth() auth: IAuth, @Body() param: CreateSiteDto) {
    const result = await this.siteService.store(auth, param);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-6203
   * @functionName update
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param auth
   * @param param
   * @url {baseUrl}/sites/{id}
   * @method PUT
   */
  @Put("/:id")
  public async update(
    @Res() res: Response,
    @Auth() auth: IAuth,
    @Param("id") id: number,
    @Body() updateRequest: UpdateSiteDto,
  ) {
    const result = await this.siteService.update(auth, id, updateRequest);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-6204
   * @functionName destroy
   * @author nvtoan27101994@gmail.com
   * @param res
   * @param id
   * @url {baseUrl}/sites/{id}
   * @method DELETE
   */
  @Delete("/:id")
  public async destroy(@Res() res: Response, @Param("id") id: number) {
    const result = await this.siteService.destroy(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Get("/possible-inspections/:siteId")
  @ApiOperation({ summary: "Get site possible inspection by id" })
  public async getPossibleSiteInspections(@Param("siteId") siteId: number, @Res() res: Response): Promise<any> {
    const result = await this.siteService.getPossibleSiteInspections(siteId);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Get("/inspections/common-exception-days")
  @ApiOperation({ summary: "Get common exception days" })
  public async getCommonExceptionDays(@Res() res: Response): Promise<any> {
    const result = await this.siteService.getCommonExceptionDays();
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Post("/inspections/schedule/time")
  @ApiOperation({ summary: "Get time schedule" })
  public async getTimeSchedule(@Body(new ValidationPipe()) body: ScheduleBobyDto, @Res() res: Response): Promise<any> {
    const result = await this.siteService.getTimeSchedule(body);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Post("/inspections/schedule/date")
  @ApiOperation({ summary: "Get date schedule" })
  public async getDateSchedule(@Body(new ValidationPipe()) body: ScheduleBobyDto, @Res() res: Response): Promise<any> {
    const result = await this.siteService.getDateSchedule(body);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
