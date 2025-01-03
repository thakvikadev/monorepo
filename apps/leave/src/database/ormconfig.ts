import { toBoolean } from '@libs/common/utility/utils';
import * as dotenv from 'dotenv';
import { join } from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

dotenv.config({
  path: join(__dirname, '../../.env'),
});

export const dataSources = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  migrationsRun: true,
  entities: [join(__dirname + '../../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname + '../../database/migrations/*{.ts,.js}')],
  synchronize: false,
  logging: toBoolean(process.env.DB_LOGGING, false),
});
