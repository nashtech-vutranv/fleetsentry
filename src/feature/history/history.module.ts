import { Module } from "@nestjs/common";
import { HistoryController } from "./history.controller";
import { HistoryService } from "./history.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UpdateHistoryEntity, UserEntity, InspectionTypeEntity } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([UpdateHistoryEntity, UserEntity, InspectionTypeEntity])],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
