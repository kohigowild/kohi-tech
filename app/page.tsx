'use client'

import { useEffect, useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { useCustomQuery } from '@/hooks/useCustomQuery'

export default function Home() {
  const { data } = useCustomQuery('postList', () =>
    useFetch({ url: '/api/notion' })
  )

  return (
    <div>
      <h1>My Blog Posts</h1>
      {data?.results?.map((item: any) => {
        return <div key={item.id}>{item.id}</div>
      })}
    </div>
  )
}
