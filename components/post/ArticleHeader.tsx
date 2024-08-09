'use client'

import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import { useFetch } from '@/hooks/useFetch'
import { articleContext, ArticleListTypes } from '@/atoms/ArticleList'
import { getFormatDate } from '@/utils/dateFormat'

export default function ArticleHeader({ frontMatter }: { [key: string]: any }) {
  const [list, setList] = useRecoilState<ArticleListTypes[]>(articleContext)

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
    }
  }, [data])

  return (
    <header className='mb-4 lg:mb-6 not-format'>
      <address className='flex items-center mb-6 not-italic'>
        <div className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
          <div>
            <span className='bg-[#4150A6] text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded'>
              {frontMatter.category}
            </span>
          </div>
        </div>
      </address>
      <h1 className='mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-5xl dark:text-white'>
        {frontMatter.title}
      </h1>
      <p className='text-base text-gray-500 dark:text-gray-400'>
        {getFormatDate(frontMatter.created_time.toString())}
      </p>
    </header>
  )
}
