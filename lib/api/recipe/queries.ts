import { ApolloQueryResult, DocumentNode, gql } from "@apollo/client";
import { initializeApollo } from "@lib/apolloClient";

import { API_RecipeCollection_Response } from "./response";

type GQL_QUERY<Arg = unknown, Response = unknown> = (
    ...args: Arg[]
) => {
    query: DocumentNode;
    request: Promise<ApolloQueryResult<Response>>;
    apolloClient: typeof apolloClient;
};

const apolloClient = initializeApollo();

export const ALL_RECIPE_QUERY = gql`
    query {
        recipeCollection {
            items {
                title
                photo {
                    url
                    description
                    title
                }
                description
                chef {
                    name
                }
            }
        }
    }
`;

export const getAllRecipes: GQL_QUERY<
    never,
    API_RecipeCollection_Response
> = () => {
    const query = ALL_RECIPE_QUERY;
    return {
        query,
        request: apolloClient.query({ query }),
        apolloClient,
    };
};

export const GET_RECIPE_BY_TITLE = gql`
    query Get_Recipe_By_Title($title: String) {
        recipeCollection(where: { title: $title }) {
            items {
                sys {
                    id
                }
                title
                photo {
                    url
                    description
                    title
                }
                description
                chef {
                    name
                }
            }
        }
    }
`;

export const getRecipeByTitle: GQL_QUERY<
    { title: string },
    API_RecipeCollection_Response
> = ({ title }) => {
    const query = GET_RECIPE_BY_TITLE;
    return {
        query,
        request: apolloClient.query({ query, variables: { title } }),
        apolloClient,
    };
};
