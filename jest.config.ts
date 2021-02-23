import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest/utils";

import { compilerOptions } from "./tsconfig.json";

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
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
    moduleNameMapper,
    collectCoverageFrom: ["src/**/*.{ts,tsx}"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
