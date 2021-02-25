import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client";
import crossFetch from "cross-fetch";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { useMemo } from "react";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

type AppApoloClient = ApolloClient<NormalizedCacheObject>;
export type ApolloPageProps<AdditionalProps = Record<string, unknown>> =
    | {
          props: {
              [APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject;
          } & AdditionalProps;
      }
    | undefined;

let apolloClient: AppApoloClient | undefined;

const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: !process.browser,
        link: new HttpLink({
            fetch: crossFetch,
            uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
            },
            credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
        }),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "no-cache",
                errorPolicy: "ignore",
            },
            query: {
                fetchPolicy: "no-cache",
                errorPolicy: "all",
            },
        },
    });
};

export function initializeApollo(initialState = null): AppApoloClient {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                ),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function addApolloState<PageProps extends Record<string, unknown>>(
    client: AppApoloClient,
    pageProps: ApolloPageProps<PageProps>
): ApolloPageProps<PageProps> {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    return pageProps;
}

export function useApollo(pageProps: ApolloPageProps): AppApoloClient {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(() => initializeApollo(state), [state]);
    return store;
}
