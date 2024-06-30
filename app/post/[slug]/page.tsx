'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useFetch } from '@/hooks/useFetch'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import { useRecoilValue } from 'recoil'
import { currentPostItem } from '@/atoms/currentPostItem'

import PostHeader from '@/components/post/PostHeader'
import PostBody from '@/components/post/PostBody'

export default function page() {
  const pathname = usePathname().substring(6)

  const { data } = useCustomQuery('postBlock', () =>
    useFetch({ url: `/api/block/${pathname}` })
  )

  return (
    <main className='pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased'>
      <div className='flex justify-between px-4 mx-auto max-w-screen-xl'>
        <article className='mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert'>
          <PostHeader pathname={pathname} />
          <PostBody data={data} />
        </article>
      </div>
    </main>
  )
}
