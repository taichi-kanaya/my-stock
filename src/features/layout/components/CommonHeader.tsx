'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

import Header from '@/components/layout/Header'

const CommonHeader: React.FC = () => {
  const { data: session } = useSession()

  return (
    <Header
      isAuthenticated={!!session}
      loginUserName={session?.user?.name ?? ''}
      onSignIn={() => signIn('google')}
      onSignOut={signOut}
    />
  )
}

export default CommonHeader
