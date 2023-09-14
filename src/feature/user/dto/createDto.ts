import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "NZTA", required: true, type: String, description: "companyCode" })
  @IsNotEmpty()
  @IsString()
  companyCode: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 1, required: false, description: "lockFlag" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  lockFlag: number;

  @ApiProperty({ example: 1, required: false, description: "deleteFlag" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  deleteFlag: number;

  @ApiProperty({ example: "manager", required: true, type: String, description: "userType" })
  @IsNotEmpty()
  @IsString()
  userType: string;

  @ApiProperty({ example: "Nori", required: true, type: String, description: "firstNameKanji" })
  @IsNotEmpty()
  @IsString()
  firstNameKanji: string;

  @ApiProperty({ example: "Yamada", required: true, type: String, description: "lastNameKanji" })
  @IsNotEmpty()
  @IsString()
  lastNameKanji: string;

  @ApiProperty({ example: "Nori", required: true, type: String, description: "firstNameKana" })
  @IsNotEmpty()
  @IsString()
  firstNameKana: string;

  @ApiProperty({ example: "Yamada", required: true, type: String, description: "lastNameKana" })
  @IsNotEmpty()
  @IsString()
  lastNameKana: string;

  @ApiProperty({ example: "Nori", required: true, type: String, description: "firstNameEn" })
  @IsNotEmpty()
  @IsString()
  firstNameEn: string;

  @ApiProperty({ example: "Yamada", required: true, type: String, description: "lastNameEn" })
  @IsNotEmpty()
  @IsString()
  lastNameEn: string;

  @ApiProperty({ example: "eric.nguyen@gmail.com", required: true, type: String, description: "email" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 1, required: true, type: Number, description: "inspector_flag" })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  inspectorFlag: number;

  @ApiProperty({ required: false, isArray: true, type: Number })
  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  roles: number[];
}
