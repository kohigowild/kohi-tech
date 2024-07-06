'use client'

import React, { Suspense } from 'react'
import Loading from '@/components/common/Loading'

export default function RecoilProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}
