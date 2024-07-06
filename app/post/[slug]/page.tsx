'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useFetch } from '@/hooks/useFetch'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import { currentPostItem } from '@/atoms/currentPostItem'
import { postList } from '@/atoms/postList'
import { getFormatDate } from '@/utils/dateFormat'

import PostHeader from '@/components/post/PostHeader'
import PostBody from '@/components/post/PostBody'
import FooterNavigation from '@/components/post/FooterNavigation'

export default function page() {
  const [list, setList] = useRecoilState(postList)
  const setCurrentPost = useSetRecoilState(currentPostItem)
  const pathname = usePathname().substring(6)

  const { data } = useCustomQuery(
    'postList',
    () => useFetch({ url: '/api/notion' }),
    {
      enabled: !list?.length,
    }
  )

  useEffect(() => {
    if (data && data.results?.length > 0) {
      const result = data.results.map((post: any) => {
        const { 이름, preview, category } = post?.properties

        return {
          id: post.id || '',
          category: category?.multi_select[0]?.name || '',
          category_color: category?.multi_select[0]?.color || '',
          created_time: getFormatDate(post.created_time) || '',
          title: 이름.title[0]?.plain_text || '',
          preview: preview?.rich_text[0]?.plain_text || '',
        }
      })
      setList(result)

      const curr = result.filter((post: any) => post.id === pathname)
      if (curr?.length > 0) setCurrentPost(curr[0])
    }
  }, [data])

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
      <FooterNavigation pathname={pathname} />
    </>
  )
}
