import { MockedProvider } from "@apollo/client/testing";
import { getRecipeByTitle } from "@lib/api/recipe/queries";
import { API_RecipeByTitle_Response } from "@lib/api/recipe/types/API_RecipeByTitle_Response";
import {
    render,
    screen,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";

import Recipe, { RecipeProps } from "../index";

describe("Recipe", () => {
    it("renders all required content", async () => {
        const testProps: RecipeProps = {
            title: "White Cheddar Grilled Cheese with Cherry Preserves & Basil",
        };

        const serverMock: API_RecipeByTitle_Response = {
            data: {
                recipeCollection: {
                    items: [
                        {
                            calories: 800,
                            chef: { name: "someChef" },
                            description: "FOOD",
                            photo: {
                                description: null,
                                title: "photo",
                                url: "photourl",
                            },
                            sys: { id: "sysId" },
                            tagsCollection: { items: [{ name: "vegan" }] },
                            title: "awesome dish",
                        },
                    ],
                },
            },
        };
        const serverMockItem = serverMock.data.recipeCollection.items[0];

        render(
            <MockedProvider
                mocks={[
                    {
                        result: { data: serverMock.data },
                        request: {
                            query: getRecipeByTitle({ title: testProps.title })
                                .query,
                            variables: { title: testProps.title },
                        },
                    },
                ]}
            >
                <Recipe {...testProps} />
            </MockedProvider>
        );

        expect(screen.getByText("Loading")).toBeInTheDocument();
        await waitForElementToBeRemoved(() => screen.getByText("Loading"));

        expect(
            screen.getByRole("heading", { name: serverMockItem.title })
        ).toBeVisible();

        expect(
            screen.getByRole("img", {
                name: serverMockItem.photo.title,
            })
        ).toBeVisible();

        expect(
            screen.getByText(serverMockItem.tagsCollection.items[0].name)
        ).toBeVisible();

        expect(screen.getByText(serverMockItem.chef.name)).toBeVisible();

        expect(screen.getByText(serverMockItem.description)).toBeVisible();
    });
});
