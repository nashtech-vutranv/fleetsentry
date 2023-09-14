import { Module } from "@nestjs/common";
import { InspectorController } from "./inspector.controller";
import { InspectorService } from "./inspector.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InspectorEntity, InspectorScheduleEntity, InspectorQualificationEntity, UserEntity } from "src/entities";
import { InspectorScheduleController } from "./schedule/inspector_schedule.controller";
import { InspectorScheduleService } from "./schedule/inspector_schedule.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([InspectorEntity, UserEntity, InspectorScheduleEntity, InspectorQualificationEntity]),
  ],
  controllers: [InspectorController, InspectorScheduleController],
  providers: [InspectorService, InspectorScheduleService],
  exports: [InspectorService],
})
export class InspectorModule {}
