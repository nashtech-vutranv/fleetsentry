import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "src/entities";
import { InspectionTypeCommentController } from "./inspection-type-comment.controller";
import { InspectionTypeCommentService } from "./inspection-type-comment.service";

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [InspectionTypeCommentController],
  providers: [InspectionTypeCommentService],
  exports: [InspectionTypeCommentService],
})
export class InspectionTypeCommentModule {}
