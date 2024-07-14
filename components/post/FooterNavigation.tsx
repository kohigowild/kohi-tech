import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { postList, PostListTypes } from '@/atoms/postList'

const FooterNavigation = ({ pathname }: { pathname: string }) => {
  const list = useRecoilValue(postList)
  const [prevPost, setPrevPost] = useState<PostListTypes | null>(null)
  const [nextPost, setNextPost] = useState<PostListTypes | null>(null)

  useEffect(() => {
    if (list?.length > 0) {
      const currIndex = list.findIndex(
        (obj: PostListTypes) => obj.id === pathname
      )

      setPrevPost(list[currIndex - 1])
      setNextPost(list[currIndex + 1])
    }
  }, [list])

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`
    }
    return title
  }

  return (
    <footer className='bg-white dark:bg-gray-900 py-10 border-t border-gray-200 hidden md:block sticky bottom-0'>
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
