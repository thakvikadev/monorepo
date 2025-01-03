import { Module } from '@nestjs/common';
import { AppModule } from './app.module';
import {
    ConfirmCreateMigrationQuestion,
    CreateMigrationCommand,
    MigrationNameQuestion,
} from './command/create-migration.command';
import { ConfirmQuestion, CreateSchemaCommand } from './command/create-schema.command';

@Module({
    imports: [AppModule],
    providers: [
        CreateSchemaCommand,
        ConfirmQuestion,
        CreateMigrationCommand,
        MigrationNameQuestion,
        ConfirmCreateMigrationQuestion,
    ],
})
export class CliModule {}
