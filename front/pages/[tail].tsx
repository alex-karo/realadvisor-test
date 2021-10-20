import type {GetServerSideProps, NextPage} from 'next'
import {Api} from "../src/api";
import Head from "next/head";
import styles from "../styles/Home.module.css";

interface ServerSideProps {
    document?: {
        title: string;
        description: string;
    }
    notFound?: boolean;
}

const Document: NextPage<ServerSideProps> = (props) => {
    if (props.notFound || !props.document) {
        return <div className={styles.container}>Document not found</div>;
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>{props.document.title}</title>
            </Head>
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
