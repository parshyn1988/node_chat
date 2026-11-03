import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';

try {
  process.loadEnvFile();
} catch {
  //
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '..', '**', '*.entity.js')],
  migrations: [join(__dirname, 'migrations', '*.js')],
  synchronize: false,
  logging: ['query', 'error'],
};

export default new DataSource(dataSourceOptions);
