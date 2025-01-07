import { Module } from '@nestjs/common';
import {
  ConfirmCreateMigrationQuestion,
  CreateMigrationCommand,
  MigrationNameQuestion,
} from './command/create-migration.command';
import { ConfirmQuestion, CreateSchemaCommand } from './command/create-schema.command';
import { LeaveModule } from './leave.module';

@Module({
  imports: [LeaveModule],
  providers: [
    CreateSchemaCommand,
    ConfirmQuestion,
    CreateMigrationCommand,
    MigrationNameQuestion,
    ConfirmCreateMigrationQuestion,
  ],
})
export class CliModule {}
