import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: process.env.API_URL ?? "http://graphql-engine:8080/v1/graphql",
    cache: new InMemoryCache(),
});
