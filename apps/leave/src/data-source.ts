import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { DatabaseSchema } from './constant/enum';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'test',
    schema: process.env.SCHEMA_NAME || DatabaseSchema.LEAVE,
    synchronize: false,
    logging: false,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*Migration.js', 'dist/migrations/*Refactoring.js', 'dist/migrations/*Insertion.js'],
});
