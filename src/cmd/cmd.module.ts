import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as entities from "../entities";
import { BasicCommand } from "./basic.cmd";
import { InstallCommand } from "./install.cmd";

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      store: async () => {
        return await redisStore({
          url: `redis://@${process.env.REDIS_HOST}:${Number(process.env.REDIS_PORT)}`,
        });
      },
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: false,
      keepConnectionAlive: true,
      logging: true,
      migrationsRun: false,
      autoLoadEntities: true,
      migrations: ["dist/database/migrations/*{.ts,.js}"],
    }),
    TypeOrmModule.forFeature(Object.values(entities as any)),
  ],
  providers: [BasicCommand, InstallCommand],
})
export class CmdModule {}
