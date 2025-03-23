import Link from 'next/link'

type HeaderProps = {
  isAuthenticated: boolean
  loginUserName?: string
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, loginUserName }) => {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto flex justify-between p-4">
        <div className="flex items-center">
          <Link className="text-xl font-semibold" href="/">
            My Stocks
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div>
              <label className="mr-10">Hello, {loginUserName}</label>
              <Link className="hover:text-gray-300" href="/signout">
                Sign out
              </Link>
            </div>
          ) : (
            <Link className="hover:text-gray-300" href="/signin">
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
