'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { isNewPost } from '@/utils/dateFormat'
import { useRecoilValue } from 'recoil'
import { articleContext, ArticleListTypes } from '@/atoms/ArticleList'
import { category, CategoryIndex } from '@/atoms/category'
import ArticlePagination from '@/components/index/ArticlePagination'

export default function ArticleList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryQ = searchParams.get('category')
  const pageQ = searchParams.get('page')

  const articleListValue = useRecoilValue(articleContext)
  const categoryValue = useRecoilValue(category)

  const [currentList, setCurrentList] = useState<ArticleListTypes[] | []>([])
  const [page, setPage] = useState<number>(1)
  const itemsCountPerPage = 5
  const indexOfLastPost = page * itemsCountPerPage
  const indexOfFirstPost = indexOfLastPost - itemsCountPerPage

  const handleClickPost = (post: ArticleListTypes) => {
    router.push(`/post/${post.id}`)
  }

  const getAllPosts = () => {
    setCurrentList(articleListValue)
  }

  const fetchCategoryPosts = () => {
    if (categoryQ) {
      const currentCategory = categoryValue.filter(
        (category: CategoryIndex) => category.index == Number(categoryQ)
      )
      if (currentCategory?.length > 0) {
        const categoryFilter = articleListValue.filter(
          (post: ArticleListTypes) =>
            post.category === currentCategory[0].category
        )
        setCurrentList(categoryFilter)
      }
    } else getAllPosts()
  }

  const handleChangePage = (page: number) => {
    setPage(page)
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`/?${params.toString()}`)
  }

  useEffect(() => {
    fetchCategoryPosts()
  }, [articleListValue, categoryQ])

  useEffect(() => {
    if (pageQ) {
      handleChangePage(Number(pageQ))
    }
  }, [pageQ])

  return (
    <>
      {currentList?.length > 0 && (
        <section className='text-gray-600 body-font overflow-hidden'>
          <div className='container px-5 py-12 mx-auto'>
            <div className='-my-8 divide-y-2 divide-gray-100'>
              {currentList
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((post: ArticleListTypes) => {
                  return (
                    <div
                      className='py-8 flex flex-wrap md:flex-nowrap cursor-pointer transition-all ease-in-out duration-500 transform hover:-translate-y-2'
                      key={post.id}
                      onClick={() => handleClickPost(post)}
                    >
                      <div className='md:w-64 md:mb-0 pt-2 mb-6 flex-shrink-0 flex flex-col'>
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
                        <h2 className='text-2xl font-semibold text-gray-700 dark:text-white title-font mb-2'>
                          {post.title}
                        </h2>
                        <p className='leading-relaxed line-clamp-2 text-gray-700 dark:text-white text-justify'>
                          {post.preview}
                        </p>
                      </div>
                    </div>
                  )
                })}
              <ArticlePagination
                page={page}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={currentList?.length}
                handlePageChange={(page: number) => handleChangePage(page)}
              />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
