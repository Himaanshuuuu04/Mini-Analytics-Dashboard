export default function Header({ className = "", children }) {
  return (
    <header className={`bg-white border-b border-b-neutral-300  ${className}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {children}
      </div>
    </header>
  );
}
