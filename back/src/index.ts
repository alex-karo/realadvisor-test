import express, { Request, Response } from "express";
import {graphqlHTTP} from "express-graphql";
import {buildSchema} from "graphql";
import { readFile, watch } from "fs/promises";
import path from "path";

const JSON_DB_PATH = process.env.JSON_PATH || path.join(__dirname, 'data.json');
let db: Map<number, any> = new Map();

async function updateDb(): Promise<void> {
    try {
        const text = await readFile(JSON_DB_PATH, {encoding: 'utf8'});
        const json = JSON.parse(text);
        db.clear();
        for (let row of json) {
            db.set(row.id, row)
        }
    } catch (e) {
        console.error(`Cant update data`, e)
    }
}

function initWatcher() {
    const watcher = watch(JSON_DB_PATH);
    (async () => {
        for await (const event of watcher) {
            if (event.eventType === 'change') {
                await updateDb();
            }
        }
    })();
}

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Doc {
    id: Int!
    title: String!
    description: String!
  }
  type Query {
    doc(id: Int!): Doc
  }
  type DocumentInput {
    id: Int!
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    doc: ({id}: {id: number}) => {
        const data = db.get(id);
        if (!data) {
            return undefined;
        }
        return data;
    },
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

(async () => {
    await updateDb();
    initWatcher();
    app.listen(80);
})();
console.log('Running a GraphQL API server at http://localhost/graphql');
