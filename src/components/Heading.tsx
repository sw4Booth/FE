interface Props {
    children: React.ReactNode;
}

const Heading = ({ children }: Props) => {
    return (
        <h1 className="text-4xl font-bold text-primary-600">{children}</h1>
    );
};

export default Heading;
