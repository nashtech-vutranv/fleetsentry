import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { CreateUserDto } from "./dto/createDto";
import { UpdateUserDto } from "./dto/updateDto";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetListUserDto } from "./dto/filterDto";
import { AppGuard } from "src/core/guard";
import { IAuth } from "src/core/interface";
import { Auth } from "src/core/decorators";

@UseGuards(AppGuard)
@Controller("users")
@ApiTags("[IC-6600] - Users")
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Create user id master" })
  async create(@Body() createUserDto: CreateUserDto, @Auth() auth: IAuth, @Res() res: Response) {
    const user = await this.userService.create(auth, createUserDto);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: user,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get list user id master" })
  async filter(@Query() query: GetListUserDto, @Res() res: Response) {
    const users = await this.userService.filter(query);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: users || [],
    });
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get detail user id master" })
  async findOne(@Param("id") id: string, @Res() res: Response) {
    const user = await this.userService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: user || {},
    });
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update user id master" })
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const user = await this.userService.update(auth, +id, updateUserDto);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: user || {},
    });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete user id master" })
  async remove(@Param("id") id: string, @Res() res: Response) {
    const result = await this.userService.remove(+id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result || {},
    });
  }
}
