import { useQuery } from "@apollo/client";
import Container from "@components/Container";
import Header from "@components/Header";
import Layout from "@components/Layout";
import { ALL_RECIPE_QUERY } from "@lib/api/recipe/queries";
import { API_RecipeCollection_Response } from "@lib/api/recipe/response";
import {
    addApolloState,
    ApolloPageProps,
    initializeApollo,
} from "@lib/apolloClient";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

type IndexPageProps = ApolloPageProps["props"];
const IndexPage: NextPage<IndexPageProps> = () => {
    const { loading, error, data } = useQuery<
        API_RecipeCollection_Response["data"]
    >(ALL_RECIPE_QUERY, {
        notifyOnNetworkStatusChange: true,
    });

    if (error) return <div>Error loading posts</div>;
    if (loading) return <div>Loading</div>;

    const { recipeCollection } = data;

    return (
        <>
            <Layout>
                <Head>
                    <title>Coding Challenge</title>
                </Head>
                <Header />
                <Container>
                    {recipeCollection.items.map((recipe, idx) => (
                        <article key={`${recipe.title}_${idx}`}>
                            <h2>{recipe.title}</h2>
                            <img src={recipe.photo.url} alt="" />
                        </article>
                    ))}
                </Container>
            </Layout>
        </>
    );
};

export const getStaticProps: GetStaticProps<
    ApolloPageProps["props"]
> = async () => {
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: ALL_RECIPE_QUERY,
    });

    return addApolloState(apolloClient, {
        props: {},
    });
};

export default IndexPage;
