import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JamaMasterController } from "./jama-master.controller";
import { JamaMasterService } from "./jama-master.service";
import { JamaMasterEntity } from "src/entities/JamaMaster.entity";

@Module({
  imports: [TypeOrmModule.forFeature([JamaMasterEntity])],
  controllers: [JamaMasterController],
  providers: [JamaMasterService],
  exports: [JamaMasterService],
})
export class JamaMasterModule {}
