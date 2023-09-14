import { IsOptional, IsNumberString, IsEmail, IsString, Matches, MinLength, MaxLength, IsIn } from "class-validator";
import { LocaleEnum, DateTimeFormat } from "src/enums";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotConsecutiveDigits } from "./validation.decorators";

const SPECIAL_CHARACTERs = "@#$%^&+=" || "^A-Za-z0-9";
export class UpdateProfileDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  phone_number?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
}
export class UpdateSettingProfileDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  timezone_code?: string;

  @ApiProperty({ required: false, enum: DateTimeFormat })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(DateTimeFormat))
  //TODO: confirm with customer about this case
  date_format?: string;

  @ApiProperty({ required: false, enum: LocaleEnum })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(LocaleEnum))
  language?: string;

  @ApiProperty({ required: false, description: "program_number" })
  @IsOptional()
  @IsString()
  start_program?: string;
}
export class ChangePasswordDto {
  @ApiProperty({ required: true })
  @IsString()
  current_password: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches("^(?=.*[A-Z]).*$", "g", { message: "$property must contain at least 1 uppercase letter." })
  @Matches("^(?=.*[a-z]).*$", "g", { message: "$property must contain at least 1 lowercase letter." })
  @Matches("^(?=.*[0-9]).*$", "g", { message: "$property must contain at least 1 number letter." })
  @Matches(`^(?=.*[${SPECIAL_CHARACTERs}]).*$`, "g", {
    message: "$property must contain at least 1 special character.",
  })
  @IsNotConsecutiveDigits(3)
  new_password: string;
}
