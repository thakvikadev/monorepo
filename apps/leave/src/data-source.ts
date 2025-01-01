import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'test',
    schema: process.env.DB_SCHEMA,
    synchronize: true,
    logging: true,
    entities: [__dirname + '/entities/*.ts'],
    migrations: [__dirname + '/migrations/*.ts'],
});
