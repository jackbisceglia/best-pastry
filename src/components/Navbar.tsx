import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="w-100 h-14 px-3 sm:px-10 bg-transparent flex justify-between items-center">
      <div>
        <Link href="/" className=" ">
          <h3 className="hover:underline cursor-pointer text-lg sm:text-2xl font-medium text-center text-emerald-700">
            Best Pastry?
          </h3>
        </Link>
      </div>
      <div>
        <Link href="/leaderboard">
          <p className="hover:underline cursor-pointer text-center text-emerald-700 text-xs sm:text-base">
            Leaderboard
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
