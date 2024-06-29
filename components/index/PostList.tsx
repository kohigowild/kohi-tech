import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function PostList({ data }: any) {
  return (
    <div>
      <ol className='relative border-s border-gray-200 dark:border-gray-700'>
        {data.map((post: any) => {
          const { 이름, 태그, 텍스트 } = post?.properties

          return (
            <li className='mb-10 ms-4' key={post.id}>
              <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
              <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                {post.created_time || ''}
              </time>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                {이름.title[0]?.plain_text || '-'}
              </h3>
              <p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
                {텍스트.rich_text[0]?.plain_text || '-'}
              </p>
              <Link
                href='#'
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700'
              >
                Learn more
                <svg
                  className='w-3 h-3 ms-2 rtl:rotate-180'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M1 5h12m0 0L9 1m4 4L9 9'
                  />
                </svg>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
