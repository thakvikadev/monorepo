import { registerAs } from '@nestjs/config';
import { Migration } from '../io/entities';
import { toBoolean } from '../utility/utils';

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
        logging: toBoolean(process.env.DB_LOGGING, false),
        entities: [_entity],
    }));

export const Entities = [Migration];