import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { Auth } from "src/core/decorators";
import { IAuth } from "src/core/interface";
import { AppGuard } from "src/core/guard";
import { CreateBody, SetupTabsBody, TabSeqDto, UpdateBody, UpdateSeqBody } from "./tab.dto";
import { TabsService } from "./tabs.service";
import { SetupService } from "./setup.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("[Setting - INS] - tabs")
@ApiBearerAuth()
@UseGuards(AppGuard)
@Controller("/setting-inspection/tabs")
export class TabsController {
  constructor(private readonly tabsService: TabsService, private readonly setupService: SetupService) {}

  /**
   * @screen IC-6120
   * @author vungpv93@gmail.com
   * @param res
   * @param auth
   * @param id
   * @description Lay toan bo thong tin du lieu: man hinh IC-6120
   * - (1) items : Chua dc assign.
   * - (2) Noi dung cac tabs ( item list by tabs )
   */
  @Get("load/:inspection_type_id")
  public async loadByInspectionTypeId(
    @Res() res: Response,
    @Auth() auth: IAuth,
    @Param("inspection_type_id") id: number,
  ) {
    const result: { items: any[]; tabs: [] } = await this.tabsService.loadAllDataByInspectionId(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @screen IC-6120
   * @author vungpv93@gmail.com
   * @functionName setupItems
   * @param res
   * @param auth
   * @param body
   * @url {baseUrl}/setting-inspection/tabs/setup-items
   * @description Cap nhat , assign item -> tab.
   */
  @Post("/setup-items")
  public async setupItems(@Res() res: Response, @Auth() auth: IAuth, @Body() body: SetupTabsBody): Promise<any> {
    await this.setupService.setup(auth, body.inspection_type_id, body.tabs);

    return res.status(HttpStatus.OK).json({
      status: true,
      data: null,
    });
  }

  /**
   * @screen IC-6123
   * @author vungpv93@gmail.com
   * @param res
   * @param auth
   * @param id
   */
  @Get("/all/:inspection_type_id")
  public async filterByInspectionTypeId(
    @Res() res: Response,
    @Auth() auth: IAuth,
    @Param("inspection_type_id") id: number,
  ) {
    const result = await this.tabsService.findAllByInspectionId(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @screen IC-6120
   * @author vungpv93@gmail.com
   * @param res
   * @param auth
   * @param body
   * @description Create new tab.
   */
  @Post("/")
  public async store(@Res() res: Response, @Auth() auth: IAuth, @Body() body: CreateBody) {
    const result = await this.tabsService.store(auth, body);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @screen IC-6120
   * @author vungpv93@gmail.com
   * @param res
   * @param auth
   * @param body
   */
  @Put("/seq")
  public async updateSeq(@Res() res: Response, @Auth() auth: IAuth, @Body() body: UpdateSeqBody) {
    const tabs: TabSeqDto[] = body.items;
    await this.tabsService.updateTabSeq(tabs);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: null,
    });
  }

  /**
   * @screen IC-6120
   * @author vungpv93@gmail.com
   * @param res
   * @param auth
   * @param id
   * @param body
   * @description Update tab
   */
  @Put("/:id")
  public async update(@Res() res: Response, @Auth() auth: IAuth, @Param("id") id: number, @Body() body: UpdateBody) {
    const result = await this.tabsService.update(id, auth, body);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @function IC-6120
   * @author vungpv93@gmail.com
   * @param res
   * @param auth
   * @param id
   * @description Destroy the tab.
   */
  @Delete("/:id")
  public async destroy(@Res() res: Response, @Auth() auth: IAuth, @Param("id") id: number) {
    const result = await this.tabsService.destroy(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
