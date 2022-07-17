import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="w-100 h-20 px-10 border-1 bg-transparent flex justify-between items-center py-2">
      <div>
        <Link href="/" className=" ">
          <h3 className="hover:underline cursor-pointer text-2xl font-medium text-center text-emerald-700">
            Best Pastry?
          </h3>
        </Link>
      </div>
      <div>
        <Link href="/leaderboard">
          <p className="hover:underline cursor-pointer text-center text-emerald-700">
            Leaderboard
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
