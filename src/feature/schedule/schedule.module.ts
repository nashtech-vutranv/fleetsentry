import { Module } from "@nestjs/common";
import { ScheduleController } from "./schedule.controller";
import { ScheduleService } from "./schedule.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  DateSpecifiedTypeExceptionDayEntity,
  MstDateSpecifiedTypeEntity,
  TimeSpecifiedTypeExceptionDayEntity,
  TimeSpecifiedTypeEntity,
} from "src/entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DateSpecifiedTypeExceptionDayEntity,
      MstDateSpecifiedTypeEntity,
      TimeSpecifiedTypeExceptionDayEntity,
      TimeSpecifiedTypeEntity,
    ]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
