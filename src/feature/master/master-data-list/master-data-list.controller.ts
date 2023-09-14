import { Controller, Get, HttpStatus, Query, Res, UseGuards } from "@nestjs/common";
import { Auth } from "src/core/decorators";
import { AppGuard } from "src/core/guard";
import { IAuth } from "src/core/interface";
import { Response } from "express";
import { MasterDataListService } from "./master-data-list.service";
import { ApiOkResponse, ApiOperation, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { FilterBaseDto } from "./master-data-list.dto";

@Controller("/master/data")
@UseGuards(AppGuard)
@ApiTags("Master-Data-List")
@ApiBearerAuth()
export class MasterDataListController {
  constructor(private masterDataListService: MasterDataListService) {}

  /**
   * @author vuducdung93@gmail.com
   * @param auth
   * @param res
   * @url {baseUrl}/master/data/inspection/types/all
   */
  @Get("inspection/types/all")
  @ApiOperation({ summary: "All Inspection Types" })
  @ApiOkResponse({
    schema: {
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          inspection_code: { type: "string" },
        },
      },
    },
  })
  public async getAInsTypes(@Auth() auth: IAuth, @Res() res: Response) {
    const result = await this.masterDataListService.getInsTypes(auth);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @author vuducdung93@gmail.com
   * @param auth
   * @param res
   * @param filterReason
   * @url {baseUrl}/master/data/inspection/type/reasons/all
   */
  @Get("inspection/type/reasons/all")
  @ApiOperation({ summary: "All Inspection Type Reasons" })
  @ApiOkResponse({
    schema: {
      items: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
    },
  })
  public async getInsTypeReasons(@Auth() auth: IAuth, @Res() res: Response, @Query() filterReason: FilterBaseDto) {
    const result = await this.masterDataListService.getInsTypeReasons(auth, filterReason);

    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @author vuducdung93@gmail.com
   * @param auth
   * @param res
   * @param filterComment
   * @url {baseUrl}/master/data/inspection/type/comments/all
   */
  @Get("inspection/type/comments/all")
  @ApiOperation({ summary: "All Inspection Type Comments" })
  @ApiOkResponse({
    schema: {
      items: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
    },
  })
  public async getInsTypeComments(@Auth() auth: IAuth, @Res() res: Response, @Query() filterComment: FilterBaseDto) {
    const result = await this.masterDataListService.getInsTypeComments(auth, filterComment);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @author vuducdung93@gmail.com
   * @param auth
   * @param res
   * @param filterSite
   * @url {baseUrl}/master/data/sites/all
   */
  @Get("sites/all")
  @ApiOperation({ summary: "All Sites" })
  @ApiOkResponse({
    schema: {
      items: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
    },
  })
  public async getSites(@Auth() auth: IAuth, @Res() res: Response, @Query() filterSite: FilterBaseDto) {
    const result = await this.masterDataListService.getSites(auth, filterSite);

    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @author vuducdung93@gmail.com
   * @param auth
   * @param res
   * @url {baseUrl}/master/data/roles/all
   */
  @Get("roles/all")
  @ApiOperation({ summary: "All Roles" })
  @ApiOkResponse({
    schema: {
      items: {
        type: "object",
        properties: { id: { type: "number" }, name: { type: "string" } },
      },
    },
  })
  public async getRoles(@Auth() auth: IAuth, @Res() res: Response) {
    const result = await this.masterDataListService.getRoles(auth);

    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @author vuducdung93@gmail.com
   * @param res
   * @url {baseUrl}/master/data/programs/all
   */
  @Get("programs/all")
  @ApiOperation({ summary: "All Programs" })
  @ApiOkResponse({
    schema: {
      items: {
        type: "object",
        properties: { id: { type: "number" }, program_name: { type: "string" }, program_name_en: { type: "string" } },
      },
    },
  })
  public async getlPrograms(@Res() res: Response) {
    const result = await this.masterDataListService.getPrograms();

    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @author vuducdung93@gmail.com
   * @param auth
   * @param res
   * @url {baseUrl}/master/data/system_parameters/all
   */
  @Get("system_parameters/all")
  @ApiOperation({ summary: "All System Parameter" })
  @ApiOkResponse({
    schema: {
      items: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
    },
  })
  public async getSystemParameters(@Auth() auth: IAuth, @Res() res: Response) {
    const result = await this.masterDataListService.getSystemParameters(auth);

    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @param auth
   * @param res
   * @url {baseUrl}/master/data/drawings/all
   */
  @Get("drawings/all")
  @ApiOperation({ summary: "Get all drawings" })
  @ApiOkResponse({
    schema: {
      items: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
    },
  })
  public async getDrawings(@Auth() auth: IAuth, @Res() res: Response) {
    const result = await this.masterDataListService.getDrawings(auth);

    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @author vuducdung93@gmail.com
   * @param auth
   * @param res
   * @url {baseUrl}/master/data/inspectors/all
   */
  @Get("inspectors/all")
  @ApiOperation({ summary: "Get all inspectors" })
  @ApiOkResponse({
    schema: {
      items: {
        type: "object",
        properties: { inspector_id: { type: "number" }, user_id: { type: "number" }, fullname: { type: "string" } },
      },
    },
  })
  public async getInspectors(@Auth() auth: IAuth, @Res() res: Response) {
    const result = await this.masterDataListService.getInspectors(auth);

    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
