import { Module } from "@nestjs/common";
import { MailTemplatesService } from "./mail-templates.service";
import { MailTemplatesController } from "./mail-templates.controller";
import { MailTemplateEntity, MstProgramEntity } from "src/entities";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([MailTemplateEntity, MstProgramEntity])],
  controllers: [MailTemplatesController],
  providers: [MailTemplatesService],
})
export class MailTemplatesModule {}
