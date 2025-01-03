## 1. Installation Test

```bash
# Install dependencies
$ npm install
```

## 2. Running the app

```bash
# Copy .env and update with the correct credential
$ cp .env.example .env
```
- local

  ```bash
  # run all projects
  $ npm run start:all
  # run approval project
  $ npm run start:approval
  # run leave projects
  $ npm run start:leave
  ```

## 3. Migration command helper

```bash
# show list migration
$ npm run migration:show

# run migration
$ npm run migration:run

# revert migration
$ npm run migration:revert

# create new file migration
$ npm run migration:create
OR
$ npx typeorm migration:create ./src/database/migrations/[filename]
```

## 4. Running seed

```bash
# Run seed
$ npm run seed:command
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
