'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useFetch } from '@/hooks/useFetch'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import ArticleList from '@/components/index/ArticleList'

import { category, CategoryIndex } from '@/atoms/category'
import { articleContext, ArticleListTypes } from '@/atoms/ArticleList'
import { getFormatDate } from '@/utils/dateFormat'

export default function Home() {
  const [list, setList] = useRecoilState<ArticleListTypes[]>(articleContext)
  const setCategory = useSetRecoilState(category)

  const { data } = useCustomQuery(
    'ArticleList',
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

      const categoryIndexArray: CategoryIndex[] = result.reduce(
        (acc: CategoryIndex[], cur: ArticleListTypes) => {
          const existingCategoryIndex = acc.findIndex(
            (post) => post.category === cur.category
          )

          if (existingCategoryIndex === -1) {
            acc.push({ category: cur.category, index: acc.length + 1 })
          }

          return acc
        },
        []
      )
      setCategory(categoryIndexArray)
    }
  }, [data])

  return (
    <div className='flex justify-center dark:bg-gray-900'>
      <div className='max-w-screen-md w-full'>
        <Image
          src={'/logo.png'}
          alt='kohi tech'
          sizes='(max-width: 1920px) 100vw, 1920px'
          width={1920}
          height={1080}
          priority
          className='rounded-lg px-20 hidden md:block'
        />
        <ArticleList />
      </div>
    </div>
  )
}
