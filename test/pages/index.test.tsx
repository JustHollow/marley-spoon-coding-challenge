import { render, screen } from "@testing-library/react";
import React from "react";

import App from "../../pages/index";

describe("App", () => {
    it("renders without crashing", () => {
        render(<App recipes={[]} />);
        expect(
            screen.getByRole("link", {
                name: /recipes/i,
            })
        ).toBeInTheDocument();
    });
});
