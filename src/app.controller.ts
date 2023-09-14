import { Controller, Get, Res, HttpStatus } from "@nestjs/common";
import { AppService } from "./app.service";
import { Response } from "express";
import { CacheService } from "./core/cache/cache.service";
import { ApiTags } from "@nestjs/swagger";
import { Locale } from "./core/decorators";

@ApiTags("App")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly cacheService: CacheService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/test")
  public index(@Res() res: Response, @Locale() locale: string): any {
    res.status(HttpStatus.OK).json({
      status: true,
      data: {
        name: process.env.APP_NAME,
        env: process.env.APP_ENV,
        locale: locale,
      },
    });
  }

  @Get("/caches/set")
  public async set(@Res() res: Response): Promise<any> {
    await this.cacheService.set("key", "value");
    res.status(HttpStatus.OK).json({
      status: true,
      data: {
        name: process.env.APP_NAME,
        env: process.env.APP_ENV,
      },
    });
  }

  @Get("/caches/get")
  public async get(@Res() res: Response): Promise<any> {
    const cache = await this.cacheService.get("key");

    res.status(HttpStatus.OK).json({
      status: true,
      data: {
        name: process.env.APP_NAME,
        env: process.env.APP_ENV,
        cache: cache ?? null,
      },
    });
  }
}
