import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PossibleInspectionEntity, SiteEntity, InspectionTypeEntity, CommonExceptionDaysEntity } from "src/entities";
import { SiteController } from "./site.controller";
import { SiteService } from "./site.service";
import { ScheduleModule } from "src/feature/schedule/schedule.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([SiteEntity, PossibleInspectionEntity, InspectionTypeEntity, CommonExceptionDaysEntity]),
    ScheduleModule,
  ],
  controllers: [SiteController],
  providers: [SiteService],
  exports: [SiteService],
})
export class SiteModule {}
