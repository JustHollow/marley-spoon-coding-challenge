import "../styles/index.css";

import { ApolloProvider } from "@apollo/client";
import { ApolloPageProps, useApollo } from "@lib/apolloClient";

type MyAppProps = { Component: React.ElementType; pageProps: ApolloPageProps };
const MyApp = ({ Component, pageProps }: MyAppProps): JSX.Element => {
    const apolloClient = useApollo(pageProps);

    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
};

export default MyApp;
