import type {GetServerSideProps, NextPage} from 'next'
import {Api} from "../src/api";

interface ServerSideProps {
    document: {
        title: string;
        description: string;
    }
    notFound?: boolean;
}

const Document: NextPage<ServerSideProps> = (props) => {
    if (props.notFound) {
        return <div>Document not found</div>;
    }
    return (
        <div>
            <h1>{props.document.title}</h1>
            <p>{props.document.description}</p>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps<ServerSideProps, { tail: string }> = async ({ params }) => {
    if (!params) {
        return { props: {notFound: true} };
    }
    const { tail } = params;
    try {
        const document = await Api.getDocument(tail);
        return {props: {document}};
    } catch (e) {
        console.error(e);
        // TODO: Improve error handling
        return { props: { notFound: true } }
    }
};

export default Document
