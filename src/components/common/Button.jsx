const Button = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
}) => {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles[variant]} px-6 py-3 rounded-xl transition-all duration-300 font-semibold`}
    >
      {children}
    </button>
  );
};

export default Button;
