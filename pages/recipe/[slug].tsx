import Container from "@components/Container";
import Header from "@components/Header";
import Layout from "@components/Layout";
import Recipe from "@components/Recipe";
import { getRecipeByTitle } from "@lib/api/recipe/queries";
import { addApolloState, ApolloPageProps } from "@lib/apolloClient";
import { GetServerSideProps, NextPage } from "next";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

type PostPageProps = ApolloPageProps<{ title: string }>["props"];
const Post: NextPage<PostPageProps> = (props) => {
    const router = useRouter();

    if (!router.isFallback && !props.title) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <Layout>
            <Container className="min-h-screen">
                <Header />
                {router.isFallback ? (
                    <div>Loading…</div>
                ) : (
                    <Recipe title={props.title} />
                )}
            </Container>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (
    context
) => {
    const slug = Array.isArray(context.params?.slug)
        ? context.params.slug[0]
        : context.params.slug;

    const { apolloClient, request } = getRecipeByTitle({ title: slug });

    await request();

    return addApolloState(apolloClient, {
        props: { title: slug },
    });
};

export default Post;
