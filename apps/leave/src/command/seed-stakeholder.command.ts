 
  import { Logger } from '@nestjs/common';
import {
  Command,
  CommandRunner,
  InquirerService,
  Question,
  QuestionSet,
} from 'nest-commander';
  
  @Command({
    name: 'seed-stakeholder',
    description: 'To seed stakeholders and recipients',
  })
  export class StakeholderCommand extends CommandRunner {
    logger = new Logger(StakeholderCommand.name);
  
    constructor(
      private readonly inquirer: InquirerService,
    ) {
      super();
    }
  
    async run() {
      try {
        const confirmed = (await this.inquirer.ask('confirmation-seeding', undefined))
          .confirm;
        if (!confirmed) {
          this.logger.debug('You made the right decision.');
          return;
        }
        this.logger.log('Seeding stakeholders and recipients...');
  
      } catch (error) {
        this.logger.error(error);
      }
    }
  }
  
  @QuestionSet({ name: 'confirmation-seeding' })
  export class SeedQuestion {
    logger = new Logger(SeedQuestion.name);
  
    @Question({
      type: 'confirm',
      name: 'confirm',
      message:
        'Will overwrite the existing data. Are you sure you want to proceed?',
      default: false,
    })
    confirm(val: boolean) {
      return val;
    }
  }