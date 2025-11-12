export const LoginButton = ({ id, children, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Placeholder for login functionality
    // This can be extended to handle actual login logic
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`m-auto inline-flex items-center gap-2 px-6 py-2 rounded-md text-white font-medium transition-all duration-200 outline-none cursor-pointer ${
        isHovered ? "bg-blue-900" : "bg-blue-950"
      } hover:shadow-md`}
      {...props}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="flex-shrink-0"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      <span>{children || "Log in"}</span>
    </button>
  );
};
