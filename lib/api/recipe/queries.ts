import { gql } from "@apollo/client";

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
