import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getFormatDate } from '@/utils/dateFormat'

interface StateType {
  id: any
  category: any
  category_color: any
  created_time: string
  title: any
  preview: any
}

const FooterNavigation = ({
  data,
  pathname,
}: {
  data: any
  pathname: string
}) => {
  const [prevPost, setPrevPost] = useState<StateType | null>(null)
  const [nextPost, setNextPost] = useState<StateType | null>(null)
  const setPostItems = (object: any) => {
    const { 이름, preview, category } = object?.properties || {}

    return {
      id: object?.id || '',
      category: category?.multi_select[0]?.name || '',
      category_color: category?.multi_select[0]?.color || '',
      created_time: getFormatDate(object?.created_time) || '',
      title: 이름?.title[0]?.plain_text || '',
      preview: preview?.rich_text[0]?.plain_text || '',
    }
  }

  useEffect(() => {
    if (data) {
      const currIndex = data.findIndex((obj: any) => obj.id === pathname)

      setPrevPost(setPostItems(data[currIndex - 1]))
      setNextPost(setPostItems(data[currIndex + 1]))
    }
  }, [data])

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`
    }
    return title
  }

  return (
    <footer className='bg-white py-10 mt-12 border-t border-gray-200 hidden md:block sticky bottom-0'>
      <div className='container mx-auto flex justify-between items-center'>
        {prevPost?.id ? (
          <>
            <div className='flex flex-col items-start max-w-xs md:max-w-sm transition-all ease-in-out duration-500 transform hover:-translate-y-2'>
              <span className='text-gray-500 text-sm mb-1'>이전글</span>
              <Link
                href={prevPost?.id || '/'}
                className='flex items-center text-[#4150A6] hover:text-[#2e388f]'
              >
                <svg
                  className='w-6 h-6 mr-2 flex-shrink-0'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M15 19l-7-7 7-7'
                  ></path>
                </svg>
                <span className='truncate'>
                  {truncateTitle(prevPost?.title || '', 20)}
                </span>
              </Link>
            </div>
          </>
        ) : (
          <div></div>
        )}
        {nextPost?.id ? (
          <div className='flex flex-col items-end max-w-xs md:max-w-sm transition-all ease-in-out duration-500 transform hover:-translate-y-2'>
            <span className='text-gray-500 text-sm mb-1'>다음글</span>
            <Link
              href={nextPost?.id || '/'}
              className='flex items-center text-[#4150A6] hover:text-[#2e388f]'
            >
              <span className='truncate'>
                {truncateTitle(nextPost?.title || '', 20)}
              </span>
              <svg
                className='w-6 h-6 ml-2 flex-shrink-0'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 5l7 7-7 7'
                ></path>
              </svg>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </footer>
  )
}

export default FooterNavigation
