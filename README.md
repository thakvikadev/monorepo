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

## 3. Migration command helper

```bash
# show list migration
$ npm run m:show

# run migration
$ npm run m:run

# revert migration
$ npm run m:revert

# create new file migration
$ npm run m:create
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
