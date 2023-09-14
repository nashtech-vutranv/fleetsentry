import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { BaseDto, UserBaseInfoDto } from "src/utils";

class NotificationDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  body: string;

  @ApiProperty()
  @Expose()
  important_flag: boolean;
}
export class NotificationUserDto extends BaseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  received_at: number;

  @ApiProperty()
  @Expose()
  read_flag: boolean;

  @ApiProperty({ type: NotificationDto })
  @Expose()
  @Type(() => NotificationDto)
  notification: NotificationDto;

  @ApiProperty({ type: UserBaseInfoDto })
  @Expose()
  @Type(() => UserBaseInfoDto)
  sender: UserBaseInfoDto;

  @ApiProperty({ type: UserBaseInfoDto })
  @Expose()
  @Type(() => UserBaseInfoDto)
  recipient: UserBaseInfoDto;
}
