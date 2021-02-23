import Footer from "@components/Footer";

type LayoutProps = React.PropsWithChildren<unknown>;
const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <>
            <div className="min-h-screen">
                <main>{children}</main>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
