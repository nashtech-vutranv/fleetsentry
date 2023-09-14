import { Module } from "@nestjs/common";
import { ItemsController } from "./items/items.controller";
import { ItemsService } from "./items/items.service";
import {
  InspectionTypeEntity,
  MstInspectionItemEntity,
  RadioOptionEntity,
  InspectionTypeItemEntity,
  TabEntity,
  TabItemEntity,
  MultiInspectionTypeEntity,
} from "src/entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeController } from "./types/types.controller";
import { TypeService } from "./types/types.service";
import { TypeItemController } from "./type-item/type-item.controller";
import { TypeItemService } from "./type-item/type-item.service";
import { TabsController } from "./tabs/tabs.controller";
import { TabsService } from "./tabs/tabs.service";
import { SetupService } from "./tabs/setup.service";
import { DownloadCsvService } from "./types/downloadCsv.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MstInspectionItemEntity,
      RadioOptionEntity,
      InspectionTypeEntity,
      InspectionTypeItemEntity,
      TabEntity,
      TabItemEntity,
      MultiInspectionTypeEntity,
    ]),
  ],
  controllers: [ItemsController, TypeController, TypeItemController, TabsController],
  providers: [ItemsService, TypeService, TypeItemService, TabsService, SetupService, DownloadCsvService],
})
export class SettingInspectionModule {}
