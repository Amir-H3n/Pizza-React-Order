import { useState } from "react";
import { useNavigate } from "react-router";

function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) navigate(`/order/${query}`);
    setQuery("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="search order id ..."
        className="w-30 rounded-lg bg-yellow-50 px-3 py-2 focus:ring focus:ring-yellow-400 focus:ring-offset-1 focus:outline-none sm:w-74 md:w-90 lg:w-120"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default Search;
