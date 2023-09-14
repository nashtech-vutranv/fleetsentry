import { Type, Expose, Transform } from "class-transformer";
import { BaseDto } from "src/utils";
import { InspectionDto } from "../../dto";
import { ApiProperty } from "@nestjs/swagger";

export class VehicleDetailDto extends BaseDto {
  @ApiProperty()
  @Expose()
  identification_number: string;

  @ApiProperty()
  @Expose()
  order_number: string;

  //car info
  @ApiProperty({ example: "pending ERP" })
  type: string;

  @ApiProperty({ example: "pending ERP" })
  maker: string;

  @ApiProperty({ example: "pending ERP" })
  color: string;

  //ship info
  @ApiProperty({ example: "pending ERP" })
  ship_name: string;

  @ApiProperty({ example: "pending ERP" })
  port_code: string;

  @ApiProperty({ example: "pending ERP" })
  destination_country: string;

  @ApiProperty({ example: "pending ERP" })
  applicant: string;

  @ApiProperty({ example: "pending ERP" })
  shiper: string;

  @ApiProperty({ example: "pending ERP" })
  fowarder: string;

  @ApiProperty({ example: "pending ERP" })
  consinee: string;

  @ApiProperty({ example: "pending ERP" })
  etd: string;

  @ApiProperty({ type: InspectionDto, isArray: true })
  @Expose()
  @Type(() => InspectionDto)
  inspections: InspectionDto[];
}
