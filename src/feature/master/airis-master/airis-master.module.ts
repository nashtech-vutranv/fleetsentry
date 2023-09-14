import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AirisMasterController } from "./airis-master.controller";
import { AirisMasterService } from "./airis-master.service";
import { AirisMasterEntity } from "src/entities/AirisMaster.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AirisMasterEntity])],
  controllers: [AirisMasterController],
  providers: [AirisMasterService],
  exports: [AirisMasterService],
})
export class AirisMasterModule {}
