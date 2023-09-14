import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SystemParameterEntity } from "src/entities/SystemParameter.entity";
import { ParameterController } from "./parameter.controller";
import { ParameterService } from "./parameter.service";
import { DownloadCsvService } from "../setting-inspection/types/downloadCsv.service";

@Module({
  imports: [TypeOrmModule.forFeature([SystemParameterEntity])],
  controllers: [ParameterController],
  providers: [ParameterService, DownloadCsvService],
  exports: [ParameterService],
})
export class ParameterModule {}
