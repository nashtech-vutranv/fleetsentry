import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { IsNonNullEmail } from "../decorator/custom-validator";

export enum Recipient {
  ORDERED = "ordered",
  ACCOUNTEE = "accountee",
  CONSIGNEE = "consignee",
  OWNER = "owner",
}

export class EmailDto {
  @ApiProperty({ example: 1, required: true, description: "index" })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  index: number;

  @IsString()
  @IsOptional()
  @IsNonNullEmail()
  email: string;
}
export class CreateMailTemplateDto {
  @ApiProperty({ example: "IC6500", required: false, description: "program" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  programId: number;

  @ApiProperty({ example: 1, required: true, type: Number, description: "default_title_flag" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  defaultFlag: number;

  @ApiProperty({ example: "name", required: false, description: "email template name" })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: "ordered", required: false, description: "recipient" })
  @IsNotEmpty()
  @IsEnum(Recipient)
  @IsString()
  recipient: string;

  @ApiProperty({ required: false, isArray: true, type: Array, description: "list recipient email" })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EmailDto)
  emails: EmailDto[];

  @ApiProperty({ required: false, isArray: true, type: Array, description: "list cc emails" })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EmailDto)
  ccEmails: EmailDto[];

  @ApiProperty({ example: "BIOPassCertificate", required: false, description: "subject" })
  @IsOptional()
  @IsString()
  subject: string;

  @ApiProperty({ example: "text", required: false, description: "mainText" })
  @IsOptional()
  @IsString()
  mainText: string;
}
