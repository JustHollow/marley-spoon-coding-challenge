import { ApolloQueryResult, DocumentNode, gql } from "@apollo/client";
import { initializeApollo } from "@lib/apolloClient";

import { API_RecipeByTitle_Response } from "./types/API_RecipeByTitle_Response";
import { API_RecipeCollection_Response } from "./types/API_RecipeCollection_Response";

type GQL_QUERY<Arg, Response> = (
    ...args: Arg[]
) => {
    query: DocumentNode;
    request: () => Promise<ApolloQueryResult<Response>>;
    apolloClient: typeof apolloClient;
};

const apolloClient = initializeApollo();

export const ALL_RECIPE_QUERY = gql`
    query ALL_RECIPE_QUERY {
        recipeCollection {
            items {
                sys {
                    id
                }
                tagsCollection {
                    items {
                        name
                    }
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
                calories
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
        request: () => apolloClient.query({ query }),
        apolloClient,
    };
};

export const GET_RECIPE_BY_TITLE = gql`
    query Get_Recipe_By_Title($title: String) {
        recipeCollection(where: { title_contains: $title }) {
            items {
                sys {
                    id
                }
                tagsCollection {
                    items {
                        name
                    }
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
                calories
            }
        }
    }
`;

export const getRecipeByTitle: GQL_QUERY<
    { title: string },
    API_RecipeByTitle_Response
> = ({ title }) => {
    const query = GET_RECIPE_BY_TITLE;

    return {
        query,
        request: () => apolloClient.query({ query, variables: { title } }),
        apolloClient,
    };
};
