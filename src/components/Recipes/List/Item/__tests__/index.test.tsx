import { render, screen } from "@testing-library/react";
import React from "react";

import RecipesListItem, { RecipesItemProps } from "../index";

describe("RecipesListItem", () => {
    it("renders all required content", () => {
        const testProps: RecipesItemProps = {
            recipe: {
                calories: 500,
                chef: { name: "MomsRecipe" },
                description: "long description",
                photo: { description: null, title: "photo", url: "someurl" },
                title: "BestDishEver",
            },
        };

        render(<RecipesListItem {...testProps} />);

        expect(
            screen.getByRole("img", {
                name: testProps.recipe.photo.title,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: testProps.recipe.title,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByText(testProps.recipe.description)
        ).toBeInTheDocument();
    });
});
