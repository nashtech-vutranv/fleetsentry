import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from "class-validator";

export class CreateNotificationDto {
  @ApiProperty({
    example: [1, 2],
    required: true,
    type: Array,
    description: "target users who will receive notification",
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  targetUsers: number[];

  @ApiProperty({ example: "title", required: true, type: String, description: "title notification" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true, example: "11-11-1997 00:00:00", type: Date, description: "release from notification" })
  @IsString()
  @IsNotEmpty()
  @IsISO8601()
  releaseFrom: string;

  @ApiProperty({ required: true, example: "11-11-1997 00:00:00", type: Date, description: "release to notification" })
  @IsString()
  @IsNotEmpty()
  @IsISO8601()
  releaseTo: string;

  @ApiProperty({ required: true, example: "content", type: String, description: "content notification" })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: true, example: 1, type: Number, description: "Important Flag" })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  isImportant: number;
}
