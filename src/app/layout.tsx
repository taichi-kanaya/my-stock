import { ReactNode } from 'react'

import type { Metadata } from 'next'

import '@/styles/tailwind.scss'
import '@/styles/global.scss'

import Footer from '@/components/layout/Footer'
import { CursorWaitProvider } from '@/components/provider/CursorWaitProvider'
import SessionProviderWrapper from '@/components/provider/SessionProviderWrapper'
import Header from '@/features/layout/components/CommonHeader'

export const metadata: Metadata = {
  title: 'My Stocks',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <SessionProviderWrapper>
          <Header />
          <CursorWaitProvider>
            <main>
              <div className="container mx-auto p-4">{children}</div>
            </main>
          </CursorWaitProvider>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
