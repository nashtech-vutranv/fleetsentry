import { Module } from "@nestjs/common";
import { MasterDataListModule } from "./master-data-list/master-data-list.module";

@Module({
  imports: [MasterDataListModule],
  controllers: [],
  providers: [],
})
export class MasterModule {}
