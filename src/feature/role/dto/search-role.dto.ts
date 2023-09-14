import { IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
export class SearchRoleDTO {
  @ApiProperty({ required: false })
  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  search?: string;
}
