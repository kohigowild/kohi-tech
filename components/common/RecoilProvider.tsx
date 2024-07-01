'use client'

import React from 'react'
import { RecoilRoot } from 'recoil'

export default function RecoilProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RecoilRoot>{children}</RecoilRoot>
}
