# Realadvisor Hasura challenge

## Requirements
- docker
- docker-compose
- [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html#install-hasura-cli)

## How to start
```shell
docker-compose up -d
cd hasura
hasura metadata apply
hasura seed apply
```
