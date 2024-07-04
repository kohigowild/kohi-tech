'use client'

import React, { useEffect } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import { useRecoilState } from 'recoil'
import { getFormatDate } from '@/utils/dateFormat'
import { currentPostItem } from '@/atoms/currentPostItem'

export default function PostHeader({ pathname }: { pathname: string }) {
  const [currentPost, setCurrentPost] = useRecoilState(currentPostItem)

  // currentPost 없는 경우 refetch
  const { data } = useCustomQuery(
    'postList',
    () => useFetch({ url: '/api/notion' }),
    {
      enabled: !currentPost?.length,
    }
  )

  useEffect(() => {
    const curr = data?.results?.filter((post: any) => post.id === pathname)[0]
    if (!!curr) {
      const { 이름, 태그, preview, category } = curr?.properties
      setCurrentPost({
        id: curr.id || '',
        category: category?.multi_select[0]?.name || '',
        category_color: category?.multi_select[0]?.color || '',
        created_time: getFormatDate(curr.created_time) || '',
        title: 이름.title[0]?.plain_text || '',
        preview: preview?.rich_text[0]?.plain_text || '',
      })
    }
  }, [data])

  return (
    <header className='mb-4 lg:mb-6 not-format'>
      <address className='flex items-center mb-6 not-italic'>
        <div className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
          <div>
            <span className='bg-[#4150A6] text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded'>
              {currentPost.category}
            </span>
            <p className='text-base text-gray-500 dark:text-gray-400'>
              {currentPost.created_time}
            </p>
          </div>
        </div>
      </address>
      <h1 className='mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
        {currentPost.title}
      </h1>
    </header>
  )
}
