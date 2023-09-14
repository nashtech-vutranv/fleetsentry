import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ProfileController } from "./profile/profile.controller";
import { ProfileService } from "./profile/profile.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  GenericCodeEntity,
  InspectorEntity,
  MstProgramEntity,
  RoleEntity,
  UserEntity,
  UserRoleEntity,
} from "src/entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserRoleEntity,
      RoleEntity,
      GenericCodeEntity,
      MstProgramEntity,
      InspectorEntity,
    ]),
  ],
  controllers: [UserController, ProfileController],
  providers: [UserService, ProfileService],
  exports: [UserService],
})
export class UserModule {}
