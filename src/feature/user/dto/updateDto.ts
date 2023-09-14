import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./createDto";

export class UpdateUserDto extends PartialType(CreateUserDto) {}
