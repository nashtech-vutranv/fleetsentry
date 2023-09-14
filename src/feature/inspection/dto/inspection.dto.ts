import { ApiProperty } from "@nestjs/swagger";
import { Transform, Expose, Type } from "class-transformer";
import { BaseDto } from "src/utils";

class SiteInfoDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  name_en: string;
}

class InspectorInfoDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => {
    return obj.user.firstname;
  })
  firstname: string;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => {
    return obj.user.lastname;
  })
  lastname: string;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => {
    return obj.user.firstname_kana;
  })
  firstname_kana: string;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => {
    return obj.user.lastname_kana;
  })
  lastname_kana: string;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => {
    return obj.user.firstname_en;
  })
  firstname_en: string;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => {
    return obj.user.lastname_en;
  })
  lastname_en: string;
}

class InspectionTypeInfoDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  inspection_code: string;
}

export class InspectionDto extends BaseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  seqn: number;

  @ApiProperty({ type: InspectionTypeInfoDto })
  @Expose()
  @Type(() => InspectionTypeInfoDto)
  inspection_type: InspectionTypeInfoDto;

  @ApiProperty({ type: SiteInfoDto, nullable: true })
  @Expose()
  @Type(() => SiteInfoDto)
  inspected_site: SiteInfoDto;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => value > 0)
  inspected_visit_site_flag: boolean;

  @ApiProperty({ nullable: true })
  @Expose()
  @Transform(({ obj }) => obj.scheduled_visit_site)
  visit_place: string;

  @ApiProperty({ type: InspectorInfoDto })
  @Expose()
  @Type(() => InspectorInfoDto)
  inspected_inspector: InspectorInfoDto;

  @ApiProperty({ example: "2023-03-03", nullable: true })
  @Expose()
  inspected_date: string;

  @ApiProperty({ nullable: true })
  @Expose()
  inspection_result: string;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => !!obj.approved_by)
  approval_status: boolean;

  @ApiProperty({ nullable: true })
  @Expose()
  image_folder_url: string;

  @ApiProperty({ nullable: true })
  @Expose()
  sticker_number: string;
}
