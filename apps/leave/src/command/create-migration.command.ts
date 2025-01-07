import { Logger } from '@nestjs/common';
import { execSync } from 'child_process';
import { Command, CommandRunner, InquirerService, Question, QuestionSet } from 'nest-commander';

interface MigrationConfirmAnswer {
  confirm: boolean;
  migrationName: string;
}

interface MigrationNameAnswer {
  migrationName: string;
}

@Command({
  name: 'create-migration',
})
export class CreateMigrationCommand extends CommandRunner {
  private readonly logger = new Logger(CreateMigrationCommand.name);

  constructor(private readonly inquirer: InquirerService) {
    super();
  }

  async run(): Promise<void> {
    try {
      // Step 1: Prompt for migration name
      const migrationNameAnswer = await this.inquirer.ask<MigrationNameAnswer>('migration-name', undefined);
      const migrationName = migrationNameAnswer.migrationName.trim();

      if (!migrationName) {
        this.logger.error('Migration name is required.');
        return;
      }

      // Step 2: Confirm the creation
      const confirmAnswer = await this.inquirer.ask<MigrationConfirmAnswer>('migration-confirm', {
        migrationName,
      });
      const confirmed = confirmAnswer.confirm;

      if (!confirmed) {
        this.logger.debug('You declined to create the migration.');
        return;
      }

      // Step 3: Generate the migration
      const command = `npx typeorm migration:create apps/leave/src/database/migrations/${migrationName}`;

      this.logger.log(`Generating migration: ${migrationName}`);
      execSync(command, { stdio: 'inherit' });

      this.logger.log(`Migration "${migrationName}" created successfully.`);
    } catch (error) {
      this.logger.error('Error creating migration:', error);
    }
  }
}

@QuestionSet({ name: 'migration-name' })
export class MigrationNameQuestion {
  @Question({
    type: 'input',
    name: 'migrationName',
    message: async () => {
      const kleur = require('kleur');
      return `\nInstruction: ${kleur.bgCyan('<Name>Migration')} OR ${kleur.bgBlue('<Name>Refactoring')} OR ${kleur.bgYellow('<Name>Insertion')}\n\nExample: 👉 ${kleur.white().bgGreen('CreateTableLeaveTypesMigration')}\n\n${kleur.magenta('Enter migration name :')}`;
    },
    validate: (input: string) => input.trim() !== '' || 'Migration name cannot be empty.',
  })
  migrationName(val: string): string {
    return val.trim();
  }
}

@QuestionSet({ name: 'migration-confirm' })
export class ConfirmCreateMigrationQuestion {
  @Question({
    type: 'confirm',
    name: 'confirm',
    message: (answers) => `Are you sure you want to create the migration "${answers.migrationName}"?`,
    default: false,
  })
  confirm(val: boolean): boolean {
    return val;
  }
}
