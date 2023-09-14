import { IsString, IsInt, IsOptional, IsNumberString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class IndexMstReasonDto {
  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  id: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  inspection_type_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  inspection_result_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "BIOPass" })
  @Expose()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "山田のり" })
  @Expose()
  content: string;

  @ApiProperty({ name: "sort_field", required: false })
  @Expose({ name: "sort_field" })
  sortField: string;

  @ApiProperty({ name: "sort_type", required: false, enum: ["ASC", "DESC"] })
  @Expose({ name: "sort_type" })
  sortType: "ASC" | "DESC";
}

export class CreateMstReasonDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  inspection_type_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  inspection_result_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "BIOPass" })
  @Expose()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "山田のり" })
  @Expose()
  content: string;
}

export class UpdateMstReasonDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  id: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  inspection_type_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  inspection_result_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "BIOPass" })
  @Expose()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "山田のり" })
  @Expose()
  content: string;
}
