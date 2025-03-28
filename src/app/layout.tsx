import { ReactNode } from 'react'

import type { Metadata } from 'next'

import '@/styles/tailwind.scss'
import '@/styles/global.scss'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'My Stocks',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header isAuthenticated={false} loginUserName="" />
        <main>
          <div className="container mx-auto p-4">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
