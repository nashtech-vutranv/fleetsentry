import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonExceptionDaysEntity } from "src/entities/CommonExceptionDays.entity";
import { CommonExceptionDayController } from "./commonExceptionDay.controller";
import { CommonExceptionDayService } from "./commonExceptionDay.service";

@Module({
  imports: [TypeOrmModule.forFeature([CommonExceptionDaysEntity])],
  controllers: [CommonExceptionDayController],
  providers: [CommonExceptionDayService],
  exports: [CommonExceptionDayService],
})
export class CommonExceptionDayModule {}
