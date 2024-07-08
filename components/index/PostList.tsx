'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { isNewPost } from '@/utils/dateFormat'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentPostItem } from '@/atoms/currentPostItem'
import { postList, PostListTypes } from '@/atoms/postList'
import { category, CategoryIndex } from '@/atoms/category'
import ListPage from './ListPage'

export default function PostList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('category')

  const setCurrentPost = useSetRecoilState(currentPostItem)
  const postListValue = useRecoilValue(postList)
  const categoryValue = useRecoilValue(category)

  const [currentList, setCurrentList] = useState<PostListTypes[] | []>([])
  const [page, setPage] = useState<number>(1)
  const itemsCountPerPage = 5
  const indexOfLastPost = page * itemsCountPerPage
  const indexOfFirstPost = indexOfLastPost - itemsCountPerPage

  const handleClickPost = (post: PostListTypes) => {
    router.push(`/post/${post.id}`)
    setCurrentPost(post)
  }

  const getAllPosts = () => {
    setCurrentList(postListValue)
  }

  const fetchCategoryPosts = () => {
    if (query) {
      const currentCategory = categoryValue.filter(
        (category: CategoryIndex) => category.index == Number(query)
      )
      if (currentCategory?.length > 0) {
        const categoryFilter = postListValue.filter(
          (post: PostListTypes) => post.category === currentCategory[0].category
        )
        setCurrentList(categoryFilter)
      }
    } else getAllPosts()
  }

  useEffect(() => {
    fetchCategoryPosts()
  }, [postListValue, query])

  return (
    <>
      {currentList?.length > 0 && (
        <section className='text-gray-600 body-font overflow-hidden'>
          <div className='container px-5 py-12 mx-auto'>
            <div className='-my-8 divide-y-2 divide-gray-100'>
              {currentList
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((post: PostListTypes) => {
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
                        <p className='leading-relaxed line-clamp-3 text-black text-justify'>
                          {post.preview}
                        </p>
                      </div>
                    </div>
                  )
                })}
              <ListPage
                page={page}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={currentList?.length}
                handlePageChange={(page) => {
                  setPage(page)
                }}
              />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
