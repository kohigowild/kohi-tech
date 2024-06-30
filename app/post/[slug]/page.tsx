'use client'

import { useFetch } from '@/hooks/useFetch'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function page() {
  const pathname = usePathname().substring(6)
  const { data } = useCustomQuery('postBlock', () =>
    useFetch({ url: `/api/block/${pathname}` })
  )

  return <div>slug</div>
}
