'use client'

import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentPostItem } from '@/atoms/currentPostItem'

export default function PostHeader() {
  const currentPost = useRecoilValue(currentPostItem)

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
