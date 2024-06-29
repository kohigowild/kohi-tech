'use client'

import React from 'react'
import { QueryClient, QueryCache, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.error(`Something went wrong: ${error}`),
  }),
})

export default function QueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
