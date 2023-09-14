import { IsInt, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class FilterDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, example: 1 })
  @Expose()
  id: number;
}
