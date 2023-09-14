import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenericCodeController } from "./generic-code.controller";
import { GenericCodeEntity } from "src/entities";
import { GenericCodeService } from "./generic-code.service";
import { DownloadCsvService } from "../setting-inspection/types/downloadCsv.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([GenericCodeEntity])],
  controllers: [GenericCodeController],
  providers: [GenericCodeService, DownloadCsvService],
  exports: [GenericCodeService],
})
export class GenericCodeModule {}
