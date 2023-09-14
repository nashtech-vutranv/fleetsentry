import { Controller, HttpStatus, Get, Query, Res, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Response } from "express";
import { AppGuard } from "src/core/guard";
import { FilterInspectorHistoryDto, FilterUserHistoryDto } from "./dto";
import { HistoryService } from "./history.service";

@ApiTags("Update History")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("history")
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  @Get("/inspector")
  @ApiOperation({ summary: "Get all inspector histories" })
  public async getAllInspectorHistories(@Res() res: Response): Promise<any> {
    const result = await this.historyService.getAllInspectorHistories();
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Get("/inspector/filter")
  @ApiOperation({ summary: "Get filtered inspector histories" })
  public async getInspectorHistories(@Query() query: FilterInspectorHistoryDto, @Res() res: Response) {
    const result = await this.historyService.getInspectorHistories(query);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Get("/user")
  @ApiOperation({ summary: "Get all user histories" })
  public async getAllUserHistories(@Res() res: Response): Promise<any> {
    const result = await this.historyService.getAllUserHistories();
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  @Get("/user/filter")
  @ApiOperation({ summary: "Get filtered user histories" })
  public async getUserHistories(@Query() query: FilterUserHistoryDto, @Res() res: Response) {
    const result = await this.historyService.getUserHistories(query);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
