import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity, RoleProgramEntity } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, RoleProgramEntity])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
