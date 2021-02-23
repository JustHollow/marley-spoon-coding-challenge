import { API_RecipeCollection_Response } from "./post/response";

async function fetchGraphQL<T>(query: string): Promise<T> {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ query }),
        }
    ).then((response) => response.json());
}

export async function getrecipes(): Promise<
    API_RecipeCollection_Response["data"]["recipeCollection"]["items"]
> {
    const entry = await fetchGraphQL<API_RecipeCollection_Response>(
        `query {
          recipeCollection {
            items {
              title
              photo {
                url,
                description,
                title
              }
              description
              chef {
                name
              }
            }
          }
        }
        
      `
    );
    return entry.data.recipeCollection.items;
}
