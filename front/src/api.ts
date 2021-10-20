import { gql } from "@apollo/client";
import { client } from "./apollo-client";

const DOCUMENT_QUERY = gql`
    query GetDocument($tail: String!) {
        long_tails(where: {tail: {_eq: $tail}}) {
            tail
            content {
                id
                description
                title
            }
        }
    }
`;

export const Api = {
    async getDocument(tail: string): Promise<{id: number, title: string, description: string} | undefined> {
        const {data, error} = await client.query({
            query: DOCUMENT_QUERY,
            variables: { tail },
        })
        console.log(data);
        console.log(error);
        if (error) {
            throw new Error(error.message);
        }
        const document = data.long_tails[0]?.content;
        if (!document) {
            throw new Error('Not Found');
        }
        return document;
    }
}
