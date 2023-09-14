import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LvisMasterController } from "./lvis-master.controller";
import { LvisMasterService } from "./lvis-master.service";
import { LvisMasterEntity } from "src/entities/LvisMaster.entity";

@Module({
  imports: [TypeOrmModule.forFeature([LvisMasterEntity])],
  controllers: [LvisMasterController],
  providers: [LvisMasterService],
  exports: [LvisMasterService],
})
export class LvisMasterModule {}
