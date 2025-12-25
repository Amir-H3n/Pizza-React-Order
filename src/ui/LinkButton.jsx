import { Link } from "react-router";

function LinkButton({ children, to, onClick }) {
  const className = "cursor-pointer text-blue-600";

  if (onClick)
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
