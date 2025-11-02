const NextButton = () => {
    return (
        <button className="flex items-end ml-auto mt-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg rounded-full mr-10">
            <img
                src="/assets/next.svg"
                alt="next"
                className="w-[50px] h-[50px]"
            />
        </button>
    );
};

export default NextButton;
