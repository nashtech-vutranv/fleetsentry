import { IsInt, IsString, IsOptional, IsObject } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeviceDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  user_id?: number | null;

  @ApiProperty({ example: "string", required: false })
  @IsOptional()
  @IsString()
  uuid: string | null;

  @ApiProperty({ example: "string", required: false })
  @IsOptional()
  @IsInt()
  os: number | null;

  @ApiProperty({ example: "string", required: false })
  @IsOptional()
  @IsString()
  os_version: string | null;

  @ApiProperty({ example: "string", required: false })
  @IsOptional()
  @IsString()
  app_version: string;

  @ApiProperty({ example: "string", required: false })
  @IsOptional()
  @IsString()
  fcm_token: string;

  @ApiProperty({ example: {}, required: false })
  @IsOptional()
  @IsObject()
  payload: Record<string, any>;
}
