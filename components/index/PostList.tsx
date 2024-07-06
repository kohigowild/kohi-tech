'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { isNewPost } from '@/utils/dateFormat'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentPostItem } from '@/atoms/currentPostItem'
import { postList, PostListTypes } from '@/atoms/postList'

export default function PostList() {
  const router = useRouter()
  const setCurrentPost = useSetRecoilState(currentPostItem)
  const postListValue = useRecoilValue(postList)

  const handleClickPost = (post: PostListTypes) => {
    router.push(`/post/${post.id}`)
    setCurrentPost(post)
  }

  return (
    <section className='text-gray-600 body-font overflow-hidden'>
      <div className='container px-5 py-12 mx-auto'>
        <div className='-my-8 divide-y-2 divide-gray-100'>
          {postListValue.map((post: PostListTypes) => {
            return (
              <div
                className='py-8 flex flex-wrap md:flex-nowrap cursor-pointer transition-all ease-in-out duration-500 transform hover:-translate-y-2'
                key={post.id}
                onClick={() => handleClickPost(post)}
              >
                <div className='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col'>
                  <span className='font-semibold title-font text-[#4150A6]'>
                    {post.category}
                  </span>
                  <span className='mt-1 text-gray-400 text-sm mt-2 items-center'>
                    {post.created_time}
                    {isNewPost(post.created_time) && (
                      <span className='mx-2 bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300'>
                        New
                      </span>
                    )}
                  </span>
                </div>
                <div className='md:flex-grow'>
                  <h2 className='text-2xl font-medium text-black title-font mb-2'>
                    {post.title}
                  </h2>
                  <p className='leading-relaxed line-clamp-3 text-black'>
                    {post.preview}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
