'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { useFetch } from '@/hooks/useFetch'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import { currentPostItem } from '@/atoms/currentPostItem'
import { getFormatDate } from '@/utils/dateFormat'

import PostHeader from '@/components/post/PostHeader'
import PostBody from '@/components/post/PostBody'
import FooterNavigation from '@/components/post/FooterNavigation'

export default function page() {
  const [currentPost, setCurrentPost] = useRecoilState(currentPostItem)
  const pathname = usePathname().substring(6)

  // currentPost 없는 경우 refetch
  const { data: postList } = useCustomQuery(
    'postList',
    () => useFetch({ url: '/api/notion' }),
    {
      enabled: !currentPost?.length,
    }
  )

  useEffect(() => {
    const curr = postList?.results?.filter(
      (post: any) => post.id === pathname
    )[0]
    if (!!curr) {
      const { 이름, preview, category } = curr?.properties
      setCurrentPost({
        id: curr.id || '',
        category: category?.multi_select[0]?.name || '',
        category_color: category?.multi_select[0]?.color || '',
        created_time: getFormatDate(curr.created_time) || '',
        title: 이름.title[0]?.plain_text || '',
        preview: preview?.rich_text[0]?.plain_text || '',
      })
    }
  }, [postList])

  const { data: blockData } = useCustomQuery('postBlock', () =>
    useFetch({ url: `/api/block/${pathname}` })
  )

  return (
    <>
      <main className='pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased'>
        <div className='flex justify-between px-4 mx-auto max-w-screen-xl'>
          <article className='mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert'>
            <PostHeader />
            <PostBody data={blockData} />
          </article>
        </div>
      </main>
      <FooterNavigation data={postList?.results || []} pathname={pathname} />
    </>
  )
}
