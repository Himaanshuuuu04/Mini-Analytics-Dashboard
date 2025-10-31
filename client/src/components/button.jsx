export default function Button({ children, className = "", variants = "primary", onClick }) {
  const variantClasses =
    variants === "secondary"
      ? "bg-white text-black border border-gray-500"
      : "bg-black text-white";

  return (
    <button
      onClick={onClick}
      className={`rounded-lg font-medium transition-all duration-200 px-2 py-1 ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
}
