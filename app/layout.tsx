import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import RecoilProvider from '@/components/common/RecoilProvider'
import QueryProvider from '@/components/common/QueryProvider'
import ToastProvider from '@/components/common/ToastProvider'
import AnalyticsProvider from '@/components/common/AnalyticsProvider'
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
            <Script
              strategy='afterInteractive'
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
            />
            <Script
              id='gtag-init'
              strategy='afterInteractive'
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
              }}
            />
            <AnalyticsProvider>
              <body className={inter.className}>
                <Header />
                <Loading />
                {children}
                <ToastProvider />
              </body>
            </AnalyticsProvider>
          </Suspense>
        </QueryProvider>
      </RecoilProvider>
    </html>
  )
}
