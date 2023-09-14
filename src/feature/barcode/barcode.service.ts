import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BarCodeIdentifyEntity } from "src/entities";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";
import { BarcodeFilterDto, CreateBarcodeIdentificationNumberDto } from "./dto";
import { IAuth } from "src/core/interface";

@Injectable()
export class BarcodeService {
  constructor(
    @InjectRepository(BarCodeIdentifyEntity) private barcodeIdentifyRepo: Repository<BarCodeIdentifyEntity>,
  ) {}

  /**
   * ME1014
   * @functionName linkIdentificationNumber
   * @description Link barcode with car identifier number
   * @returns {Promise<any>}
   */
  public async linkIdentificationNumber(auth: IAuth, data: CreateBarcodeIdentificationNumberDto): Promise<any> {
    let obj = {
      barcode: data.barcode,
      identification_number: data.identificationNumber,
      created_by: auth.id,
      updated_by: auth.id,
    };

    // check exist
    const existBarcodeRecord = await this.barcodeIdentifyRepo.findOne({
      where: { barcode: data.barcode }
    });
    const existIdentificationNumberRecord = await this.barcodeIdentifyRepo.findOne({
      where: { identification_number: data.identificationNumber }
    });

    if (existBarcodeRecord) throw new AppException(ErrorCode.E202001);
    if (existIdentificationNumberRecord) throw new AppException(ErrorCode.E202002);

    return await this.barcodeIdentifyRepo.save(
      this.barcodeIdentifyRepo.create(obj)
    );
  }

  /**
   * ME1011
   * @functionName findOneByBarcode
   * @description Search identification number by barcode
   * @returns {Promise<any>}
   */
  public async findOneByBarcode(query: BarcodeFilterDto): Promise<any> {
    const record = await this.barcodeIdentifyRepo.findOne({
      where: { barcode: query.barcode }
    });

    return record;
  }
}
