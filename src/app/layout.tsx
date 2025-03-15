import type { Metadata } from 'next'
import { ReactNode } from 'react'
import '@/app/styles/tailwind.scss'
import '@/app/styles/global.scss'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
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
