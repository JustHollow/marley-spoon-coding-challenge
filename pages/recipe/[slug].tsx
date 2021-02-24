import Container from "@components/Container";
import Header from "@components/Header";
import Layout from "@components/Layout";
import SectionSeparator from "@components/Section-separator";
import { getRecipeByTitle } from "@lib/api/recipe/queries";
import { API_RecipeCollection_Response } from "@lib/api/recipe/response";
import { addApolloState, ApolloPageProps } from "@lib/apolloClient";
import { GetServerSideProps, NextPage } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";

type PostPageProps = {
    recipe:
        | API_RecipeCollection_Response["data"]["recipeCollection"]["items"][0]
        | null;
};

const Post: NextPage<PostPageProps> = (props) => {
    const router = useRouter();

    if (!router.isFallback) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <Layout>
            <Container>
                <Header />
                {router.isFallback ? (
                    <div>Loading…</div>
                ) : (
                    <>
                        <article>
                            <Head>
                                <title>{recipe.title} | Coding Challenge</title>
                                <meta
                                    property="og:image"
                                    content={recipe.photo.url}
                                />
                            </Head>
                        </article>
                        <SectionSeparator />
                    </>
                )}
            </Container>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<
    ApolloPageProps["props"]
> = async (context) => {
    const slug = Array.isArray(context.params?.slug)
        ? context.params.slug[0]
        : context.params.slug;

    // const data = await API(slug, preview);

    const { apolloClient, request } = getRecipeByTitle({ title: slug });

    await request;

    return addApolloState(apolloClient, {
        props: {},
    });
};

export default Post;
