import Container from "@components/Container";
import Header from "@components/Header";
import Layout from "@components/Layout";
import { API_RecipeCollection_Response } from "@lib/post/response";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { getrecipes } from "../lib/api";

type IndexPageProps = {
    recipes: API_RecipeCollection_Response["data"]["recipeCollection"]["items"];
};
const IndexPage: NextPage<IndexPageProps> = (props) => {
    return (
        <>
            <Layout>
                <Head>
                    <title>Coding Challenge</title>
                </Head>
                <Header />
                <Container>
                    {props.recipes.map((recipe, idx) => (
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

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
    const recipes = (await getrecipes()) ?? [];
    return {
        props: { recipes },
    };
};

export default IndexPage;
