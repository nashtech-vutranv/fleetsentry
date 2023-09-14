import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { TypeOrmConfigService } from "./typeOrm.config";

const typeOrmOptions = new TypeOrmConfigService().createTypeOrmOptions() as DataSourceOptions;
export default new DataSource(typeOrmOptions);
