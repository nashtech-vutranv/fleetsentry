import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async set(key: string, value: any, ttl?: number) {
    await this.cacheManager.set(key, value, ttl * 1000);
  }

  public async get(key: string) {
    return await this.cacheManager.get(key);
  }

  public async del(key: string) {
    await this.cacheManager.del(key);
  }

  public async reset(): Promise<void> {
    await this.cacheManager.reset();
  }
}
