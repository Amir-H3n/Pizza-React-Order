import { Link } from "react-router";

function Button({ children, type, onClick, to, disabled = false }) {
  const base = "transition-colors duration-300 hover:text-white uppercase";
  const types = {
    primary: "p-2.5 bg-yellow-400 hover:bg-yellow-500 rounded-lg",
    small: "px-2 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-lg",
    secondary:
      "p-2 border border-zinc-400 text-zinc-500 hover:bg-zinc-500 rounded-lg",
    round:
      "px-2.5 py-1 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded-full",
  };
  if (to)
    return (
      <Link className={`${base} ${types[type]}`} to={to}>
        {children}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      className={`${base} ${types[type]}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
