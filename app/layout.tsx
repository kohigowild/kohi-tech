import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import RecoilProvider from '@/components/common/RecoilProvider'
import QueryProvider from '@/components/common/QueryProvider'
import ToastProvider from '@/components/common/ToastProvider'
import Suspense from '@/components/common/Suspense'
import Header from '@/components/common/Header'
import Loading from '@/components/common/Loading'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KOTHUB',
  description: '코히 테크 블로그',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko'>
      <RecoilProvider>
        <QueryProvider>
          <Suspense>
            <body className={inter.className}>
              <Header />
              <Loading />
              {children}
              <ToastProvider />
            </body>
          </Suspense>
        </QueryProvider>
      </RecoilProvider>
    </html>
  )
}
