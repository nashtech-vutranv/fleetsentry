import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsInt, IsNumberString, IsOptional, IsString } from "class-validator";

export class IndexInspectionTypeCommentDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  id: string;

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

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  system_flag: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  inspector_id: number;

  @ApiProperty({ name: "sort_field", required: false })
  @Expose({ name: "sort_field" })
  sortField: string;

  @ApiProperty({ name: "sort_type", required: false, enum: ["ASC", "DESC"] })
  @Expose({ name: "sort_type" })
  sortType: "ASC" | "DESC";
}

export class CreateInspectionTypeCommentDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  inspection_type_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "BIO" })
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

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  system_flag: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  inspector_id: number;
}

export class UpdateInspectionTypeCommentDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  inspection_type_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "BIO" })
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

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  system_flag: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  inspector_id: number;
}
