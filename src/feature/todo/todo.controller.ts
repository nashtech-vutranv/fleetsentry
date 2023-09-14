import { Controller, Get, Res, HttpStatus, Post, Body, Delete, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { TodoDto } from "./todo.dto";
import { TodoService } from "./todo.service";
import { AppGuard } from "src/core/guard";
import { Auth } from "src/core/decorators";
import { IAuth } from "src/core/interface";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@UseGuards(AppGuard)
@ApiTags("Todo")
@ApiBearerAuth()
@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }

  /**
   * @function index
   * @author vungpv93@gmail.com
   * @param auth
   * @param res
   * @url {baseUrl}/todo
   * @method GET
   */
  @Get()
  public async index(@Auth() auth: IAuth, @Res() res: Response): Promise<any> {
    const items = await this.todoService.filter();
    return res.status(HttpStatus.OK).json({
      status: true,
      data: {
        items: items ?? [],
      },
    });
  }

  /**
   * @param res
   * @param todoBody
   */
  @Post()
  public async store(@Res() res: Response, @Body() todoBody: TodoDto): Promise<any> {
    const todo = await this.todoService.store(todoBody);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: { todo: todo },
    });
  }

  @Delete()
  public async destroy(@Res() res: Response): Promise<any> {
    const result = await this.todoService.destroy(3);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result ?? null,
    });
  }
}
