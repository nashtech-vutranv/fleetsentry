import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LanguageLabelController } from "./language-label.controller";
import { LanguageLabelEntity } from "src/entities";
import { LanguageLabelService } from "./language-label.service";
import { DownloadCsvService } from "../setting-inspection/types/downloadCsv.service";

@Module({
  imports: [TypeOrmModule.forFeature([LanguageLabelEntity])],
  controllers: [LanguageLabelController],
  providers: [LanguageLabelService, DownloadCsvService],
  exports: [LanguageLabelService],
})
export class LanguageLabelModule {}
