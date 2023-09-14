import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InputItemController } from "./input-item.controller";
import { InputItemEntity } from "src/entities/InputItem.entity";
import { InputItemService } from "./input-item.service";
import { DownloadCsvService } from "../setting-inspection/types/downloadCsv.service";

@Module({
  imports: [TypeOrmModule.forFeature([InputItemEntity])],
  controllers: [InputItemController],
  providers: [InputItemService, DownloadCsvService],
  exports: [InputItemService],
})
export class InputItemModule {}
