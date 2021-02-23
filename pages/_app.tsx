import "../styles/index.css";

type MyAppProps = { Component: React.ElementType; pageProps: unknown };
const MyApp = ({ Component, pageProps }: MyAppProps): JSX.Element => {
    return <Component {...pageProps} />;
};

export default MyApp;
