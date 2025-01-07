import { Module } from '@nestjs/common';
import { ApprvalModule } from './approval.module';
import {
  ConfirmCreateMigrationQuestion,
  CreateMigrationCommand,
  MigrationNameQuestion,
} from './command/create-migration.command';
import { ConfirmQuestion, CreateSchemaCommand } from './command/create-schema.command';

@Module({
  imports: [ApprvalModule],
  providers: [
    CreateSchemaCommand,
    ConfirmQuestion,
    CreateMigrationCommand,
    MigrationNameQuestion,
    ConfirmCreateMigrationQuestion,
  ],
})
export class CliModule {}
