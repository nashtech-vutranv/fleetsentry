import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class FilterBaseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsInt()
  inspection_type_id: number;
}
