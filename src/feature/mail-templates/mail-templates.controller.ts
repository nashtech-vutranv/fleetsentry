import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Auth, IPaginateReq, Pagination } from "src/core/decorators";
import { AppGuard } from "src/core/guard";
import { IAuth } from "src/core/interface";
import { CreateMailTemplateDto } from "./dto/createDto";
import { GetListMailTemplateDto } from "./dto/filterDto";
import { UpdateMailTemplateDto } from "./dto/updateDto";
import { MailTemplatesService } from "./mail-templates.service";

@UseGuards(AppGuard)
@Controller("mail-templates")
@ApiTags("[IC-6500] - Mail Templates")
@ApiBearerAuth()
export class MailTemplatesController {
  constructor(private readonly mailTemplatesService: MailTemplatesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Create mail template master" })
  async create(@Body() createMailTemplateMasterDto: CreateMailTemplateDto, @Auth() auth: IAuth, @Res() res: Response) {
    const mailTemplate = await this.mailTemplatesService.create(auth, createMailTemplateMasterDto);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: mailTemplate,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get list mail template master" })
  async filter(@Query() query: GetListMailTemplateDto, @Pagination() pagination: IPaginateReq, @Res() res: Response) {
    const mailTemplates = await this.mailTemplatesService.filter(query, pagination);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: mailTemplates || [],
    });
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get detail mail template master" })
  async findOne(@Param("id") id: string, @Res() res: Response) {
    const mailTemplate = await this.mailTemplatesService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: mailTemplate || {},
    });
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update mail template master" })
  async update(
    @Param("id") id: string,
    @Body() updateMailTemplateMasterDto: UpdateMailTemplateDto,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ) {
    const mailTemplate = await this.mailTemplatesService.update(auth, +id, updateMailTemplateMasterDto);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: mailTemplate,
    });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update mail template master" })
  async remove(@Param("id") id: string, @Res() res: Response) {
    const result = await this.mailTemplatesService.remove(+id);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result || {},
    });
  }
}
