import { Body, Controller, Get, Param, Put, Query, Res, UseGuards, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { RoleService } from "./role.service";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { Auth, Pagination, IPaginateReq } from "src/core/decorators";
import { AppGuard } from "src/core/guard";
import { IAuth } from "src/core/interface";
import { SearchRoleDTO, UpdateRoleDto, RoleDto, RoleDetailDto } from "./dto";

@UseGuards(AppGuard)
@Controller("roles")
@ApiTags("[IC6610] - Roles")
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  /**
   * @author: vuducdung93@gmail.com
   * @url {baseUrl}/roles
   */
  @Get()
  @ApiOperation({ summary: "list role-masters" })
  @ApiOkResponse({ type: RoleDto, isArray: true })
  public async filter(
    @Auth() auth: IAuth,
    @Pagination() paginateReq: IPaginateReq,
    @Query() query: SearchRoleDTO,
    @Res() res: Response,
  ): Promise<any> {
    //TODO: check user has permison view role-master program
    const result = await this.roleService.filter(auth, paginateReq, query);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @author vuducdung93@gmail.com
   * @url {baseUrl}/roles/:id
   * @function show
   */
  @Get("/:id")
  @ApiOperation({ summary: "details role-master" })
  @ApiOkResponse({ type: RoleDetailDto })
  public async show(@Auth() auth: IAuth, @Param("id") id: number, @Res() res: Response): Promise<any> {
    //TODO: check user has permison view role-master-details
    const result = await this.roleService.findOne(auth, id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @author vuducdung93@gmail.com
   * @url {baseUrl}/roles/:id
   * @function update
   */
  @Put("/:id")
  @ApiOperation({ summary: "update role-master" })
  @ApiOkResponse({ type: RoleDetailDto })
  public async update(
    @Auth() auth: IAuth,
    @Param("id") id: number,
    @Body() updataRole: UpdateRoleDto,
    @Res() res: Response,
  ): Promise<any> {
    //TODO check user has permison update role-master

    const result = await this.roleService.update(auth, id, updataRole);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
