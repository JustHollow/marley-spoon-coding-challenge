import Container from "@components/Container";
import Header from "@components/Header";
import Layout from "@components/Layout";
import RecipesList from "@components/Recipes/List";
import { getAllRecipes } from "@lib/api/recipe/queries";
import { addApolloState, ApolloPageProps } from "@lib/apolloClient";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

type IndexPageProps = ApolloPageProps["props"];
const IndexPage: NextPage<IndexPageProps> = () => {
    return (
        <Layout>
            <Head>
                <title>Coding Challenge</title>
            </Head>
            <Container>
                <Header />
                <RecipesList />
            </Container>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<
    ApolloPageProps["props"]
> = async () => {
    const { apolloClient, request } = getAllRecipes();

    await request();

    return addApolloState(apolloClient, {
        props: {},
    });
};

export default IndexPage;
