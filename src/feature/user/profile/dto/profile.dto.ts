import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseDto } from "src/utils";

export class ProfileDto extends BaseDto {
  @ApiProperty()
  @Expose()
  company_name: string;

  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  firstname: string;

  @ApiProperty()
  @Expose()
  lastname: string;

  @ApiProperty()
  @Expose()
  firstname_kana: string;

  @ApiProperty()
  @Expose()
  lastname_kana: string;

  @ApiProperty()
  @Expose()
  firstname_en: string;

  @ApiProperty()
  @Expose()
  lastname_en: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  phone_number: string;
}
export class SettingsProfileDto extends BaseDto {
  @ApiProperty()
  @Expose()
  language: string;

  @ApiProperty()
  @Expose()
  timezone_code: string;

  @ApiProperty()
  @Expose()
  date_format: string;

  @ApiProperty()
  @Expose()
  start_program: string;
}
