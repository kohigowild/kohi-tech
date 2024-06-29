'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useFetch } from '@/hooks/useFetch'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import PostList from '@/components/index/PostList'

export default function Home() {
  const { data } = useCustomQuery('postList', () =>
    useFetch({ url: '/api/notion' })
  )

  return (
    <div className='flex justify-center'>
      <div className='max-w-screen-sm w-full'>
        <Image
          src={'/logo.png'}
          alt='kohi tech'
          layout='responsive'
          width={1920}
          height={1080}
          className='rounded-lg'
        />
        <PostList data={data?.results || []} />
      </div>
    </div>
  )
}
