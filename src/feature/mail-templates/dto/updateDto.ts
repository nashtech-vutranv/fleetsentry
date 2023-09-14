import { PartialType } from "@nestjs/mapped-types";
import { CreateMailTemplateDto } from "./createDto";

export class UpdateMailTemplateDto extends PartialType(CreateMailTemplateDto) {}
