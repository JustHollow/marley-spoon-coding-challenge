type ContainerProps = React.PropsWithChildren<unknown>;
const Container = ({ children }: ContainerProps): JSX.Element => {
    return <div className="container mx-auto px-5">{children}</div>;
};

export default Container;
