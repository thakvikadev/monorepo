import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { Migration } from '../io/entities';

dotenv.config({
  path: join(process.cwd(), process.env.PROJECT_ENV_FILE || '.env'),
});

export default (_entity: string) =>
  registerAs('database', () => ({
    type: process.env.DB_DRIVER || 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    database: process.env.DB_DATABASE || 'test',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    useUTC: true,
    synchronize: false,
    autoLoadEntities: true,
    logging: true,
    entities: [_entity],
  }));

export const Entities = [Migration];
