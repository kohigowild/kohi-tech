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
            <span className='bg-[#4150A6] text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded'>
              {currentPost.category}
            </span>
          </div>
        </div>
      </address>
      <h1 className='mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-5xl dark:text-white'>
        {currentPost.title}
      </h1>
      <p className='text-base text-gray-500 dark:text-gray-400'>
        {currentPost.created_time}
      </p>
    </header>
  )
}
