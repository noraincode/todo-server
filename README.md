## Description

The Todo App back-end repo, build by [Nest.js](https://nestjs.com/) and [TiDB](https://tidbcloud.com)

Front-end repo: https://github.com/noraincode/todo-app

[Live demo](https://todo-app-ev4n.vercel.app) - Powered by Vercel

## Installation

```bash
$ pnpm install
```

## Configuration

```bash
cp .example.env .prod.env

# Update your TiDB config here
TIDB_HOST=xxx
TIDB_PORT=4000
TIDB_USER=xxx
TIDB_PASSWORD=xxx
TIDB_DATABASE=xxx
TIDB_SYNCHRONIZE=false
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
