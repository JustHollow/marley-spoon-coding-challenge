import { useQuery } from "@apollo/client";
import { getRecipeByTitle } from "@lib/api/recipe/queries";
import { API_RecipeByTitle_Response } from "@lib/api/recipe/types/API_RecipeByTitle_Response";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";

export type RecipeProps = { title: string };
const Recipe = (props: RecipeProps): JSX.Element => {
    const { query } = getRecipeByTitle({ title: props.title });
    const { loading, error, data } = useQuery<
        API_RecipeByTitle_Response["data"]
    >(query, { variables: { title: props.title } });

    if (error) return <div>Error loading posts</div>;
    if (loading) return <div>Loading</div>;

    const {
        recipeCollection: {
            items: [recipe],
        },
    } = data;

    if (!recipe)
        return (
            <div>
                <p className="my-6">
                    Sorry no recipe found, but there is a lot of them on the
                    main page
                </p>
                <Link href="/">
                    <a>
                        <button className="border-4 border-green-500 text-green-900 bg-green-50 rounded-xl p-10 w-full">
                            TO THE MAIN PAGE
                        </button>
                    </a>
                </Link>
            </div>
        );

    return (
        <div className={clsx("gap-4")}>
            <article>
                <Head>
                    <title>{recipe.title} | Coding Challenge</title>
                    <meta property="og:image" content={recipe.photo.url} />
                </Head>
                <h1 className="font-semibold mb-3">{recipe.title}</h1>
                <img
                    src={recipe.photo.url}
                    alt={recipe.photo.description}
                    title={recipe.photo.title}
                    className="w-full"
                />
                <section className="my-4 space-x-2">
                    {recipe.tagsCollection.items.map((tag, idx) => (
                        <span
                            key={`${tag.name}_${idx}`}
                            className="bg-green-100 text-green-900 px-3 py-2 rounded-md"
                        >
                            {tag.name}
                        </span>
                    ))}
                </section>

                <section className="my-6 space-y-1">
                    <b>Chef:</b>{" "}
                    <span className="italic">
                        {recipe.chef?.name ?? "Marley Spoon"}
                    </span>
                </section>

                <section className="my-6 space-y-1">
                    <b>Description:</b>
                    <p className="text-gray-900 leading-tight">
                        {recipe.description ?? "Will be ready soon"}
                    </p>
                </section>
            </article>
        </div>
    );
};

export default Recipe;
