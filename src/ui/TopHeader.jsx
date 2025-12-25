import { Link } from "react-router";
import Search from "./Search";
import Username from "../features/user/Username";
import { memo } from "react";

const TopHeader = memo(function TopHeader() {
  return (
    <div className="flex items-center justify-between py-2">
      <Link
        className="cursor-pointer font-semibold tracking-wider text-stone-800 uppercase sm:text-xl md:text-2xl"
        to="/"
      >
        Fast React Pizza Co.
      </Link>
      <Search />
      <Username />
    </div>
  );
});

export default TopHeader;
