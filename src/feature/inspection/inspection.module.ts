import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  InspectionScheduleResultEntity,
  InspectorEntity,
  InspectionTypeEntity,
  SiteEntity,
  VehicleCommentEntity,
  TabEntity,
  MstInspectionItemEntity,
  InspectionItemResultsEntity,
  InspectionTypeItemEntity,
} from "src/entities";
import { VehicleController } from "./vehicle/vehicle.controller";
import { VehicleService } from "./vehicle/vehicle.service";
import { ResultsController } from "./results/results.controller";
import { ResultsService } from "./results/results.service";
import { InspectionController } from "./inspection.controller";
import { InspectionService } from "./inspection.service";
import { VehicleCommentController } from "./vehicle-comment/vehicle-comment.controller";
import { VehicleCommentService } from "./vehicle-comment/vehicle-comment.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TabEntity,
      InspectionItemResultsEntity,
      MstInspectionItemEntity,
      InspectionScheduleResultEntity,
      InspectorEntity,
      InspectionTypeEntity,
      SiteEntity,
      VehicleCommentEntity,
      InspectionTypeItemEntity,
    ]),
  ],
  controllers: [VehicleController, ResultsController, InspectionController, VehicleCommentController],
  providers: [VehicleService, ResultsService, InspectionService, VehicleCommentService],
  exports: [],
})
export class InspectionModule {}
