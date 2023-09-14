import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CreateNotificationDto } from "./createDto";
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class TargetUsersDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  notificationUserId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  recipientId: number;
}
export class UpdateNotificationDto extends OmitType(CreateNotificationDto, ["targetUsers"]) {
  @ApiProperty({ example: [{ notificationUserId: 1, recipientId: 2 }], type: Array })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TargetUsersDto)
  targetUsers: TargetUsersDto[];
}
