import { spawn } from 'child_process';
import { Command } from 'commander';
import { readdirSync } from 'fs';
import * as inquirer from 'inquirer';

const program = new Command();

enum ACTION {
  GENERATE = 'generate',
  RUN = 'run',
  REVERT = 'revert',
  CREATE = 'create',
  SHOW = 'show',
  CREATE_SCHEMA = 'create-schema',
  SEED = 'seed',
}

const commanders = ['create-schema', 'create-migration'];

const getDirectories = (path: string): string[] =>
  readdirSync(path, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

const prompt = inquirer.createPromptModule();
const spawnProcess = (command: string, args: string[]) => spawn(command, args, { stdio: 'inherit' });

const handleMigrationAction = async (action: ACTION, project: string) => {
  switch (action) {
    case ACTION.GENERATE:
      return spawnProcess('npm', [
        'run',
        'typeorm',
        'migration:generate',
        '--',
        `apps/${project}/src/database/migrations/migration`,
        '-d',
        `apps/${project}/src/database/ormconfig.ts`,
      ]);

    case ACTION.RUN:
    case ACTION.REVERT:
    case ACTION.SHOW:
      return spawnProcess('npm', [
        'run',
        'typeorm',
        `migration:${action}`,
        '--',
        '-d',
        `apps/${project}/src/database/ormconfig.ts`,
      ]);

    case ACTION.CREATE:
      const { migrationName } = await prompt({
        type: 'input',
        name: 'migrationName',
        message: 'Migration name:',
      });
      return spawnProcess('npm', [
        'run',
        'typeorm',
        'migration:create',
        '--',
        `apps/${project}/src/database/migrations/${migrationName}`,
        '-d',
        `apps/${project}/src/database/ormconfig.ts`,
      ]);
    case ACTION.CREATE_SCHEMA:
      return spawnProcess('npm', [
        'run',
        'typeorm',
        'query',
        `CREATE SCHEMA IF NOT EXISTS ${project};`,
        '--',
        '-d',
        `apps/${project}/src/database/ormconfig.ts`,
      ]);

    case ACTION.SEED:
      const { commander } = await prompt({
        type: 'list',
        name: 'commander',
        message: 'Select a commander:',
        choices: commanders,
      });
      return spawnProcess('npx', ['ts-node', `apps/${project}/src/main-cli.ts`, '--', commander]);

    default:
      console.error('Invalid action');
      return;
  }
};

const promptForProject = async (action: ACTION) => {
  const dirs = getDirectories('apps');
  const { project } = await prompt({
    type: 'list',
    name: 'project',
    message: 'Which project would you like to migrate?',
    choices: dirs,
  });
  await handleMigrationAction(action, project);
};

program
  .command('migration')
  .description('CLI for migrations')
  .argument('<action>', 'migration action: generate, run, revert, create, show, create-schema, seed')
  .action((action) => {
    if (!Object.values(ACTION).includes(action as ACTION)) {
      console.error(`Invalid action: ${action}`);
      return;
    }
    promptForProject(action as ACTION);
  });

program.parse(process.argv);
