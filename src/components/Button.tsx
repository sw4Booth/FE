type ButtonVariant = "solid" | "outline";
type ButtonColor = "primary" | "gray";
type ButtonSize = "sm" | "md" | "lg";

interface Props {
    children: React.ReactNode;
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    disabled?: boolean;
    onClick?: () => void;
}

const Button = ({ children, variant = "solid", color = "primary", size = "md", disabled = false, onClick }: Props) => {
    const colorStyles: Record<ButtonColor, { solid: string; outline: string }> = {
        primary: {
            solid: "bg-primary-600 hover:bg-primary-500 text-white",
            outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
        },
        gray: {
            solid: "bg-gray-600 hover:bg-gray-500 text-white",
            outline: "border-2 border-gray-400 text-gray-600 hover:bg-gray-100",
        },
    };

    const sizeStyles: Record<ButtonSize, string> = {
        sm: "px-4 py-2 text-sm rounded-full",
        md: "px-8 py-3 text-base rounded-full",
        lg: "px-12 py-4 text-lg rounded-full",
    };

    const baseStyles = "font-medium text-center cursor-pointer";

    return (
        <button className={[baseStyles, sizeStyles[size], colorStyles[color][variant], disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""].join(" ")} onClick={onClick}>{children}</button>
    );
};

export default Button;
