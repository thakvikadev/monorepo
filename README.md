## 1. Installation

```bash
# Install dependencies
$ npm install
```

## 2. Running the app

```bash
# Copy .env and update with the correct credential
$ cp .env.example .env
```

## 3. Migration command helper

```bash
# show list migration
$ npm run migration:generate

# run migration
$ npm run migration:run

# revert migration
$ npm run migration:generate

# create new file migration
$ npm run migration:generate
OR
$ npx typeorm migration:create ./src/migrations/[filename]
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
