import { Module } from "@nestjs/common";
import { BarcodeController } from "./barcode.controller";
import { BarcodeService } from "./barcode.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BarCodeIdentifyEntity } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([BarCodeIdentifyEntity])],
  controllers: [BarcodeController],
  providers: [BarcodeService],
  exports: [BarcodeService],
})
export class BarcodeModule {}
