

const SectionTitle = ({heading, subheading}) => {
    return (
        <div>
            <h1 className="text-lg font-bold">{heading}</h1>
            <p className="text-4xl">{subheading}</p>
        </div>
    );
};

export default SectionTitle;