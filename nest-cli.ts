const fs = require('fs');

const projects = ['leave', 'approval'];
const config = {
  $schema: 'https://json.schemastore.org/nest-cli',
  collection: '@nestjs/schematics',
  monorepo: true,
  compilerOptions: {
    deleteOutDir: true,
    webpack: true,
  },
  projects: {},
};
projects.forEach((project) => {
  config.projects[project] = {
    type: 'application',
    root: `apps/${project}`,
    entryFile: `apps/${project}/src/main`,
    sourceRoot: `apps/${project}/src`,
    compilerOptions: {
      tsConfigPath: `apps/${project}/tsconfig.app.json`,
    },
  };
});

fs.writeFileSync('nest-cli.json', JSON.stringify(config, null, 2));
