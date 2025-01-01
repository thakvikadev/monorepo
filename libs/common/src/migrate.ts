import { execSync } from 'child_process';
import 'dotenv/config';
import * as path from 'path';

function runMigration() {
    const args = process.argv.slice(2);
    const actionArg = args.find((arg) => arg.startsWith('--action='));
    const action = actionArg ? actionArg.split('=')[1] : 'show';

    const project = process.env.PROJECT;
    if (!project) {
        console.error('Error: PROJECT environment variable is not set.');
        process.exit(1);
    }

    const projectPath = path.join(__dirname, '../../../apps/', project);

    const ormConfigPath = path.join(projectPath, 'src', 'data-source.ts');
    console.log('here', projectPath, ormConfigPath);
    try {
        let command = `npx typeorm migration:${action} --dataSource ${ormConfigPath}`;
        // Add specific arguments only when necessary
        if (action === 'generate') {
            const migrationName = args.find((arg) => arg.startsWith('--name='))?.split('=')[1];
            if (!migrationName) {
                console.error('Error: Migration name is required for generate action.');
                process.exit(1);
            }
            command = `npx typeorm migration:generate ${migrationName} --dataSource ${ormConfigPath}`;
        }

        console.log(`Running command: ${command}`);
        execSync(command, { stdio: 'inherit', cwd: projectPath });
    } catch (error) {
        console.error(`Error running migration for project "${project}":`, error.message);
        process.exit(1);
    }
}

runMigration();
