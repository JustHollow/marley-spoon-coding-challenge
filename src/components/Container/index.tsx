import clsx from "clsx";

type ContainerProps = React.PropsWithChildren<JSX.IntrinsicElements["div"]>;
const Container = ({
    children,
    ...restDivProps
}: ContainerProps): JSX.Element => {
    return (
        <div
            {...restDivProps}
            className={clsx("container mx-auto px-5", restDivProps.className)}
        >
            {children}
        </div>
    );
};

export default Container;
