import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { BaseDto, UserBaseInfoDto } from "src/utils";

export class RoleProgramDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  read_permission_flag: boolean;

  @ApiProperty()
  @Expose()
  create_permission_flag: boolean;

  @ApiProperty()
  @Expose()
  update_permission_flag: boolean;

  @ApiProperty()
  @Expose()
  delete_permission_flag: boolean;

  @ApiProperty()
  @Expose()
  download_permission_flag: boolean;

  @ApiProperty()
  @Expose()
  program_id: number;
}

export class RoleDto extends BaseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  updated_at: string;

  @ApiProperty({ type: UserBaseInfoDto })
  @Expose()
  @Type(() => UserBaseInfoDto)
  updated_by: UserBaseInfoDto;
}

export class RoleDetailDto extends BaseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: number;

  @ApiProperty({ type: RoleProgramDto, isArray: true })
  @Expose()
  @Type(() => RoleProgramDto)
  rolePrograms: RoleProgramDto[];
}
