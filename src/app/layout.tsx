import type { Metadata } from 'next'
import { ReactNode } from 'react'
import '@/app/globals.css'
import { ApolloWrapper } from "@/lib/apollo-provider";

export const metadata: Metadata = {
  title: 'My Stocks App',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  )
}
