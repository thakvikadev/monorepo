import { Logger } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Command, CommandRunner, InquirerService, Question, QuestionSet } from 'nest-commander';
import { EntityManager } from 'typeorm';
import { DatabaseSchema } from '../constant/enum';

@Command({
    name: 'create-schema',
})
export class CreateSchemaCommand extends CommandRunner {
    logger = new Logger(CreateSchemaCommand.name);

    constructor(
        private readonly inquirer: InquirerService,

        @InjectEntityManager()
        private readonly manager: EntityManager,
    ) {
        super();
    }

    async run() {
        try {
            const confirmed = (await this.inquirer.ask('confirmation', undefined)).confirm;
            if (!confirmed) {
                this.logger.debug('You declined to create the schema.');
                return;
            }

            await this.manager.query(`CREATE SCHEMA IF NOT EXISTS ${DatabaseSchema.LEAVE}`);
            this.logger.log(`Schema ${DatabaseSchema.LEAVE} has been created successfully.`);
        } catch (error) {
            this.logger.error('Error creating schema:', error);
        }
    }
}

@QuestionSet({ name: 'confirmation' })
export class ConfirmQuestion {
    logger = new Logger(ConfirmQuestion.name);

    @Question({
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to proceed to create schema ${DatabaseSchema.LEAVE} ?`,
        default: false,
    })
    confirm(val: boolean) {
        return val;
    }
}