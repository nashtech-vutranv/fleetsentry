import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  InspectionTypeEntity,
  SiteEntity,
  RoleEntity,
  MstProgramEntity,
  CommentEntity,
  ReasonEntity,
  DrawingEntity,
  SystemParameterEntity,
  InspectorEntity,
} from "src/entities";
import { MasterDataListController } from "./master-data-list.controller";
import { MasterDataListService } from "./master-data-list.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InspectionTypeEntity,
      SiteEntity,
      RoleEntity,
      MstProgramEntity,
      CommentEntity,
      ReasonEntity,
      SystemParameterEntity,
      DrawingEntity,
      InspectorEntity,
    ]),
  ],
  providers: [MasterDataListService],
  controllers: [MasterDataListController],
  exports: [MasterDataListService],
})
export class MasterDataListModule {}
