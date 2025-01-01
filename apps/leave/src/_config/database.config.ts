
import { registerAs } from '@nestjs/config';
import { toBoolean } from '../utility/utils';
import { Migration } from '../io/entities';

export default (entity: string) =>
    registerAs('database', () => ({
        type: process.env.DB_DRIVER || 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        database: process.env.DB_DATABASE || 'test',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        useUTC: true,
        autoLoadEntities: true,
        logging: toBoolean(process.env.DB_LOGGING, false),
        entities: [entity],
    }));

export const Entities = [Migration];
