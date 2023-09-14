import { Module } from "@nestjs/common";
import { NakInformationController } from "./nak-information.controller";
import { NakInformationService } from "./nak-information.service";
import { NakInformationEntity } from "src/entities";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([NakInformationEntity])],
  controllers: [NakInformationController],
  providers: [NakInformationService],
  exports: [NakInformationService]
})
export class NakInformationModule {}
