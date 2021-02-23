import Container from "@components/Container";
import Header from "@components/Header";
import Layout from "@components/Layout";
import SectionSeparator from "@components/Section-separator";
import { API_RecipeCollection_Response } from "@lib/post/response";
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
    const { recipe } = props;

    if (!router.isFallback && !recipe) {
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

export const getServerSideProps: GetServerSideProps<PostPageProps> = async () => {
    // const slug = Array.isArray(context.params?.slug)
    //     ? context.params.slug[0]
    //     : context.params.slug;

    // const data = await API(slug, preview);

    return {
        props: {
            recipe: null,
        },
    };
};

export default Post;
