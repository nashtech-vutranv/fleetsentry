import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MstCarBodyTypeController } from "./mst-car-body-type.controller";
import { MstCarBodyTypeService } from "./mst-car-body-type.service";
import { CarBodyTypeEntity } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([CarBodyTypeEntity])],
  controllers: [MstCarBodyTypeController],
  providers: [MstCarBodyTypeService],
  exports: [MstCarBodyTypeService],
})
export class MstCarBodyTypeModule {}
