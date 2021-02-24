import Container from "@components/Container";

const Footer = (): JSX.Element => {
    return (
        <footer className="bg-accent-1 border-t border-accent-2 mt-28">
            <Container>
                <div className="py-6 flex flex-col lg:flex-row items-center">
                    <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
                        Marley Spoon coding Challenge
                    </h3>
                    <p>
                        <a href="https://github.com/JustHollow">
                            Done by Pavel Deneschik
                        </a>
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
