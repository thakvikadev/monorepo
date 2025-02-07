import { spawn } from 'child_process';
import { Command } from 'commander';
import { readdirSync } from 'fs';
import * as inquirer from 'inquirer';

const program = new Command();

const promptFunc = async (action: ACTION) => {
  
  const dirs = readdirSync('apps', { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

  const prompt = inquirer.createPromptModule();
  return prompt([
    /* Pass your questions in here */
    {
      type: 'list',
      name: 'project',
      message: 'Which project would you like to migrate?',
      choices: dirs,
    },
  ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      console.log(answers);
      if (action == ACTION.GENERATE) {
        // Generate migration
        return spawn(
          'npm',
          [
            'run',
            'typeorm',
            'migration:generate',
            '--',
            `apps/${answers.project}/src/database/migrations/migration`,
            '-d',
            `apps/${answers.project}/src/database/ormconfig.ts`,
          ],
          { stdio: 'inherit' },
        );
      }

      if (action == ACTION.RUN) {
        // Run migration
        return spawn(
          'npm',
          [
            'run',
            'typeorm',
            'migration:run',
            '--',
            '-d',
            `apps/${answers.project}/src/database/ormconfig.ts`,
          ],
          { stdio: 'inherit' },
        );
      }

      if (action == ACTION.REVERT) {
        // Revert migration
        return spawn(
          'npm',
          [
            'run',
            'typeorm',
            'migration:revert',
            '--',
            '-d',
            `apps/${answers.project}/src/database/ormconfig.ts`,
          ],
          { stdio: 'inherit' },
        );
      }

      if (action == ACTION.CREATE) {
        // Create migration
        return prompt([
          {
            type: 'input',
            name: 'migrationName',
            message: 'Migration name',
          },
        ]).then(({migrationName}) => {
          return spawn(
            'npm',
            [
              'run',
              'typeorm',
              'migration:create',
              '--',
              `apps/${answers.project}/src/database/migrations/${migrationName}`,
              '--',
              '-d',
              `apps/${answers.project}/src/database/ormconfig.ts`,
            ],
            { stdio: 'inherit' },
          );
        });
      }
      if (action == ACTION.SHOW) {
        // Show migration
        return spawn(
          'npm',
          [
            'run',
            'typeorm',
            'migration:show',
            '--',
            '-d',
            `apps/${answers.project}/src/database/ormconfig.ts`,
          ],
          { stdio: 'inherit' },
        );
      }
      if (action == ACTION.CREATE_SCHEMA) {
        // Create schema
        return spawn(
          'npm',
          [
            'run',
            'typeorm',
            'query',
            `CREATE SCHEMA IF NOT EXISTS ${answers.project};`,
            '--',
            '-d',
            `apps/${answers.project}/src/database/ormconfig.ts`,
          ],
          { stdio: 'inherit' },
        );
      }
      if (action == ACTION.SEED) {
        const cli = `apps/${answers.project}/src/main-cli.ts`;
        return prompt([
          {
            type: 'select',
            name: 'commander',
            message: 'Commender name?',
            choices: commanders,
          },
        ]).then(({commander}) => {
          return spawn(
            'npx',
            [
              'ts-node',
              cli,
              '--',
              commander,
            ],
            { stdio: 'inherit' },
          );
        });
        
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

enum ACTION {
  GENERATE = 'generate',
  RUN = 'run',
  REVERT = 'revert',
  CREATE = 'create',
  SHOW= 'show',
  CREATE_SCHEMA = 'create-schema',
  SEED = 'seed'
}

const commanders = ["seed-stakeholder","create-schema","create-migration"]


program
  .command('migration')
  .description('CLI for migrations')
  .argument('<action>', 'migration action: generate, run, revert, create')
  .action((action) => {
    if (
      action !== ACTION.GENERATE &&
      action !== ACTION.RUN &&
      action !== ACTION.REVERT &&
      action !== ACTION.CREATE &&
      action !== ACTION.SHOW &&
      action !== ACTION.CREATE_SCHEMA &&
      action !== ACTION.SEED
    ) {
      console.log('Invalid action');
      return;
    }

    promptFunc(action);
  });

program.parse(process.argv);


