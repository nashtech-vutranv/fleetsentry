import { IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "../../../utils";

export class CreateBarcodeIdentificationNumberDto extends BaseDto {
  @ApiProperty({ example: "string", required: true })
  @IsString()
  barcode: string;

  @ApiProperty({ example: "string", required: true })
  @IsString()
  identificationNumber: string;
}


export class BarcodeFilterDto extends BaseDto {
  @ApiProperty({ example: "string", required: true })
  @IsString()
  barcode: string;
}
