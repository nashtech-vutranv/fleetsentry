import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MstReasonController } from "./mst-reason.controller";
import { MstReasonService } from "./mst-reason.service";
import { ReasonEntity } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([ReasonEntity])],
  controllers: [MstReasonController],
  providers: [MstReasonService],
  exports: [MstReasonService]
})
export class MstReasonModule {}
