import Link from 'next/link'

import OriginalLink from '@/components/basic/Link'

type HeaderProps = {
  isAuthenticated: boolean
  loginUserName?: string
  onSignIn: () => void
  onSignOut: () => void
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, loginUserName, onSignIn, onSignOut }) => {
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
              <OriginalLink href="#" onClick={onSignOut}>
                Sign out
              </OriginalLink>
            </div>
          ) : (
            <div>
              <OriginalLink href="#" onClick={onSignIn}>
                Sign in
              </OriginalLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
