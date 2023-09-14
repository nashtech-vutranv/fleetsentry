import { Module } from "@nestjs/common";
import { NotificationController } from "./user/notification.controller";
import { NotificationService } from "./user/notification.service";
import { NotificationEntity, NotificationUserEntity, UserEntity } from "src/entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SystemNotificationController } from "./user/system.notification.controller";
@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity, NotificationUserEntity, UserEntity])],
  controllers: [NotificationController, SystemNotificationController],
  providers: [NotificationService],
  exports: [],
})
export class NotificationModule {}
