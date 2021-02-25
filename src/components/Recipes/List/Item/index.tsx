import { API_RecipeCollection_Response } from "@lib/api/recipe/types/API_RecipeCollection_Response";
import Link from "next/link";

export type RecipesItemProps = {
    recipe: API_RecipeCollection_Response["data"]["recipeCollection"]["items"][0];
};

const RecipesItem = ({ recipe }: RecipesItemProps): JSX.Element => {
    return (
        <Link href={`/recipe/${encodeURI(recipe.title)}`}>
            <a>
                <article className="flex flex-col gap-2 shadow-md px-4 py-3 h-full">
                    <img
                        src={recipe.photo.url}
                        alt={recipe.photo.description}
                        title={recipe.photo.title}
                    />
                    <h2 className="font-semibold">{recipe.title}</h2>
                    <p className=" my-3 text-gray-800 leading-tight overflow-hidden">
                        {recipe.description}
                    </p>
                </article>
            </a>
        </Link>
    );
};

export default RecipesItem;
