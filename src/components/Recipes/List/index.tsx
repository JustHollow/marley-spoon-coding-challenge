import { useQuery } from "@apollo/client";
import { getAllRecipes } from "@lib/api/recipe/queries";
import { API_RecipeCollection_Response } from "@lib/api/recipe/types/API_RecipeCollection_Response";
import clsx from "clsx";

import RecipesItem from "./Item";
import Styles from "./recipes-list.module.scss";

const RecipesList = (): JSX.Element => {
    const { query } = getAllRecipes();
    const { loading, error, data } = useQuery<
        API_RecipeCollection_Response["data"]
    >(query, {
        notifyOnNetworkStatusChange: true,
    });

    if (error) return <div>Error loading posts</div>;
    if (loading) return <div>Loading</div>;
    const { recipeCollection } = data;

    return (
        <div className={clsx(Styles.showroom, "gap-4")}>
            {recipeCollection.items.map((recipe, idx) => (
                <RecipesItem key={`${recipe.title}_${idx}`} recipe={recipe} />
            ))}
        </div>
    );
};

export default RecipesList;
