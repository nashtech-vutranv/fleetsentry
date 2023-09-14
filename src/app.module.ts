import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { redisStore } from "cache-manager-redis-yet";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CacheService } from "./core/cache/cache.service";
import { JwtStrategy } from "./core/strategy/jwt.strategy";
import * as entities from "./entities/index";
import { AuthModule } from "./feature/auth/auth.module";
import { GenericCodeModule } from "./feature/generic-code/generic-code.module";
import { InspectorModule } from "./feature/inspector/inspector.module";
import { MailTemplatesModule } from "./feature/mail-templates/mail-templates.module";
import { MasterModule } from "./feature/master/master.module";
import { MstReasonModule } from "./feature/mst-reason/mst-reason.module";
import { NakInformationModule } from "./feature/nak-information/nak-information.module";
import { RoleModule } from "./feature/role/role.module";
import { ScheduleModule } from "./feature/schedule/schedule.module";
import { SettingInspectionModule } from "./feature/setting-inspection/setting-inspection.module";
import { SiteModule } from "./feature/site/site.module";
import { ParameterModule } from "./feature/system/parameter.module";
import { TodoController } from "./feature/todo/todo.controller";
import { TodoService } from "./feature/todo/todo.service";
import { UserModule } from "./feature/user/user.module";
import { InspectionTypeCommentModule } from "./feature/inspection-type-comment/inspection-type-comment.module";
import { MstCarBodyTypeModule } from "./feature/mst-car-body-type/mst-car-body-type.module";
import { HistoryModule } from "./feature/history/history.module";

import { InspectionModule } from "./feature/inspection/inspection.module";
import { LanguageLabelModule } from "./feature/language-label/language-label.module";
import { JamaMasterModule } from "./feature/master/jama-master/jama-master.module";
import { AirisMasterModule } from "./feature/master/airis-master/airis-master.module";
import { LvisMasterModule } from "./feature/master/lvis-master/lvis-master.module";
import { InputItemModule } from "./feature/input-item/input-item.module";
import { NotificationModule } from "./feature/notification/notification.module";
import { BarcodeModule } from "./feature/barcode/barcode.module";
import { CommonExceptionDayModule } from "./feature/system/common-exception-day/commonExceptionDay.module";
import { DeviceModule } from "./feature/device/device.module";

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
    AuthModule,
    InspectorModule,
    SiteModule,
    ScheduleModule,
    MasterModule,
    AirisMasterModule,
    LvisMasterModule,
    JamaMasterModule,
    SettingInspectionModule,
    RoleModule,
    UserModule,
    ParameterModule,
    NakInformationModule,
    MstReasonModule,
    MstCarBodyTypeModule,
    GenericCodeModule,
    MailTemplatesModule,
    InspectionTypeCommentModule,
    InspectionModule,
    HistoryModule,
    LanguageLabelModule,
    InputItemModule,
    NotificationModule,
    BarcodeModule,
    CommonExceptionDayModule,
    DeviceModule,
  ],
  controllers: [AppController, TodoController],
  providers: [AppService, CacheService, TodoService, JwtStrategy],
})
export class AppModule {}
