import TopHeader from "./TopHeader";
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-24 flex-col justify-between bg-yellow-400 px-5 shadow-xs md:px-10 lg:rounded-md">
      <TopHeader />
      <Navbar />
    </header>
  );
}

export default Header;
