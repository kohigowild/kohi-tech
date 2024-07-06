'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useFetch } from '@/hooks/useFetch'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import PostList from '@/components/index/PostList'
import Category from '@/components/index/Category'

import { category } from '@/atoms/category'
import { postList } from '@/atoms/postList'
import { getFormatDate } from '@/utils/dateFormat'

export default function Home() {
  const [list, setList] = useRecoilState(postList)
  const setCategory = useSetRecoilState(category)

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
    }
  }, [data])

  return (
    <div className='flex justify-center'>
      <div className='max-w-screen-md w-full'>
        <Image
          src={'/logo.png'}
          alt='kohi tech'
          sizes='(max-width: 1920px) 100vw, 1920px'
          width={1920}
          height={1080}
          className='rounded-lg px-20 hidden md:block'
        />
        <Category />
        <PostList />
      </div>
    </div>
  )
}
