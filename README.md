# Realadvisor Hasura challenge

## Requirements
- docker
- docker-compose
- [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html#install-hasura-cli)

## How to start
```shell
git pull git@github.com:alex-karo/realadvisor-test.git
cd realadvisor-test
docker-compose up -d
cd hasura
hasura metadata apply
hasura seed apply
```

## Check URLs
- [1](http://localhost:3000/best-hello-ever)
- [2](http://localhost:3000/best-hello-world-ever)
- [3](http://localhost:3000/best-world-ever)

## TODO
- Add production setup
- Describe deploy
- Set up prettier/linters and add git hooks
- Refactor back: split file, migrate to apollo server, add validation and error handling
- Refactor front: improve error handling, add typings/functions generation from GraphQL
