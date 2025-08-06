const sizeClasses = {
  sm: "text-sm py-2 px-4",
  md: "text-base py-3 px-7",
  lg: "text-lg py-4 px-10",
};

const variantClasses = {
  fill: "text-white bg-primary-500 border-primary-500 hover:cursor-pointer hover:bg-primary-700 hover:border-primary-700 active:bg-primary-700 active:border-primary-700",
  outline:
    "text-primary-500 bg-white border-primary-500 hover:cursor-pointer hover:bg-primary-50 active:bg-primary-100",
};

const shapeClasses = {
  pill: "rounded-full",
  square: "rounded-md",
};

const Button = ({
  children,
  size = "md",
  variant = "fill",
  shape = "square",
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium text-center border disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 ${sizeClasses[size]} ${variantClasses[variant]} ${shapeClasses[shape]}`}
    >
      {children}
    </button>
  );
};

export default Button;
