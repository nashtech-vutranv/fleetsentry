import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfig } from "src/constants";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JwtConfig.secret,
      signOptions: { expiresIn: "60m" },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
