import { IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDto {
  @ApiProperty({ description: "The user ID of the inspector", example: 1 })
  @IsNotEmpty()
  @IsInt()
  user_id: number; // foreign key to user table
}
