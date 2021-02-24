declare namespace NodeJS {
    export interface ProcessEnv {
        NEXT_PUBLIC_CONTENTFUL_SPACE_ID: string;
        NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: string;
        CONTENTFUL_PREVIEW_ACCESS_TOKEN: string;
        CONTENTFUL_PREVIEW_SECRET: string;
    }
}
