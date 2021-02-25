import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest/utils";

import { compilerOptions } from "./tsconfig.json";

const tsModuleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
});

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(ts|tsx)$": "babel-jest",
    },
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.jest.json",
        },
    },
    moduleNameMapper: {
        ...tsModuleNameMapper,
        "^.+\\.(css|less|sass|scss)$": "<rootDir>/test/__mocks__/styleMock.ts",
    },
    collectCoverageFrom: ["src/**/*.{ts,tsx}"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
