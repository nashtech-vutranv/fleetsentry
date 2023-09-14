import { IsBoolean, IsInt, IsOptional, IsArray } from "class-validator";
import { Transform, Type } from "class-transformer";
import { toBoolean } from "../helpers";
import { ApiProperty } from "@nestjs/swagger";
import { MyValidateNested } from "src/core/decorators";
export class UpdateRoleProgramDto {
  @ApiProperty({ required: true, description: "role_program's id" })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  id: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => toBoolean(value))
  @IsOptional()
  @IsBoolean()
  read_permission_flag?: boolean;

  @ApiProperty({ required: false })
  @Transform(({ value }) => toBoolean(value))
  @IsOptional()
  @IsBoolean()
  create_permission_flag?: boolean;

  @ApiProperty({ required: false })
  @Transform(({ value }) => toBoolean(value))
  @IsOptional()
  @IsBoolean()
  update_permission_flag?: boolean;

  @ApiProperty({ required: false })
  @Transform(({ value }) => toBoolean(value))
  @IsOptional()
  @IsBoolean()
  delete_permission_flag?: boolean;

  @ApiProperty({ required: false })
  @Transform(({ value }) => toBoolean(value))
  @IsOptional()
  @IsBoolean()
  download_permission_flag?: boolean;
}
export class UpdateRoleDto {
  @ApiProperty({ type: UpdateRoleProgramDto, isArray: true })
  @IsArray()
  @MyValidateNested({ each: true })
  @Type(() => UpdateRoleProgramDto)
  items: UpdateRoleProgramDto[];
}
