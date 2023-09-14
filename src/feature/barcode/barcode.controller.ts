import { Controller, Post, Res, UseGuards, HttpStatus, Body, Get, Query } from "@nestjs/common";
import { Response } from "express";
import { Auth } from "src/core/decorators";
import { AppGuard } from "src/core/guard";
import { IAuth } from "src/core/interface";
import { BarcodeService } from "./barcode.service";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { BarcodeFilterDto, CreateBarcodeIdentificationNumberDto } from "./dto";

@Controller("/barcode")
@UseGuards(AppGuard)
@ApiTags("Barcode")
@ApiBearerAuth()
export class BarcodeController {
  constructor(private barcodeService: BarcodeService) {}

  /**
   * @author thu.pa1506@gmail.com
   * @url {baseUrl}/barcode/link
   * @method POST
   * @description link barcode with car identifier number
   */
  @Post("/link")
  @ApiOperation({ summary: "link barcode with car identifier number" })
  public async linkIdentificationNumber(
    @Body() body: CreateBarcodeIdentificationNumberDto,
    @Auth() auth: IAuth,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.barcodeService.linkIdentificationNumber(auth, body);

    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * @author thu.pa1506@gmail.com
   * @url {baseUrl}/barcode/search
   * @method GET
   * @description search identification number by barcode
   */
  @Get("/search")
  @ApiOperation({ summary: "search identification number by barcode" })
  public async search(
    // @Auth() auth: IAuth,
    @Res() res: Response,
    @Query() query: BarcodeFilterDto 
  ): Promise<any> {
    const record = await this.barcodeService.findOneByBarcode(query);

    return res.status(HttpStatus.OK).json({
      status: true,
      data: record,
    });
  }
}
