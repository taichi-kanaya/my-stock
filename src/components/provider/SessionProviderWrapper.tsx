'use client'

import { ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'

type Props = {
  children: ReactNode
}

export default function SessionProviderWrapper({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>
}
