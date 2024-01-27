import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto flex justify-between p-4">
        <div className="flex items-center">
          <Link className="text-xl font-semibold" href="/">
            My Stocks
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link className="hover:text-gray-300" href="/signin">
            Sign in
          </Link>
          <Link className="hover:text-gray-300" href="/signout">
            Sign out
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
