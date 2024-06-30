'use client'

import React, { useEffect } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import { useRecoilState } from 'recoil'
import { getFormatDate } from '@/utils/getFormatDate'
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

  const getCurrentPost = () => {
    const curr = data?.results?.filter((post: any) => post.id === pathname)[0]
    if (!!curr) {
      const { 이름, 태그, preview, category } = curr?.properties
      setCurrentPost({
        id: curr.id || '',
        category: category?.multi_select[0]?.name || '',
        created_time: getFormatDate(curr.created_time) || '',
        title: 이름.title[0]?.plain_text || '',
        preview: preview?.rich_text[0]?.plain_text || '',
      })
    }
  }

  useEffect(() => {
    getCurrentPost()
  }, [data])

  return (
    <header className='mb-4 lg:mb-6 not-format'>
      <address className='flex items-center mb-6 not-italic'>
        <div className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
          <div>
            <p className='text-base text-gray-500 dark:text-gray-400'>
              {currentPost.category}
            </p>
            <p className='text-base text-gray-500 dark:text-gray-400'>
              <time dateTime='2022-02-08' title='February 8th, 2022'>
                {currentPost.created_time}
              </time>
            </p>
          </div>
        </div>
      </address>
      <h1 className='mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white'>
        {currentPost.title}
      </h1>
    </header>
  )
}
