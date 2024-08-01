import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import { useFetch } from '@/hooks/useFetch'
import { getFormatDate } from '@/utils/dateFormat'
import { useToast } from '@/hooks/useToast'

export default function Comment() {
  const [randomNickname, setRandomNickname] = useState<{
    adj: string[]
    noun: string[]
  }>({ adj: [], noun: [] })
  const [userName, setUserName] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const pathname = usePathname().substring(6)

  const { data: commentData, refetch } = useCustomQuery('getComment', () =>
    useFetch({ url: `/api/comment/${pathname}` })
  )

  const getCommentInfo = (content: string, index: number) => {
    const split = content.split(' || ')
    if (split?.length > 0) {
      return split[index]
    } else {
      return ''
    }
  }

  const getRandomElement = (arr: string[]) => {
    if (arr?.length > 0) {
      const randomIndex = Math.floor(Math.random() * arr.length)
      return arr[randomIndex]
    }
    return ''
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/nickname.json')
      const data = await res.json()
      setRandomNickname(data)
    }
    fetchData()
  }, [])

  const getUserNickname = () => {
    if (randomNickname) {
      const adj = getRandomElement(randomNickname.adj)
      const noun = getRandomElement(randomNickname.noun)
      setUserName(`${adj} ${noun}`)
    }
  }

  useEffect(() => {
    getUserNickname()
  }, [randomNickname])

  const sendCommentRequest = async () => {
    const response = await fetch('/api/comment/create', {
      method: 'POST',
      body: JSON.stringify({
        pageId: pathname,
        content: comment,
        user: userName,
      }),
    })
    if (!response.ok) {
      throw new Error('Failed to create comment')
    }
    return response.json()
  }

  const handleConfirmComment = async () => {
    if (userName.trim() === '') {
      useToast({ text: '닉네임을 입력해 주세요.' })
    } else if (comment.trim() === '') {
      useToast({ text: '댓글을 입력해 주세요.' })
    } else {
      try {
        await sendCommentRequest()
        refetch()
        setComment('')
        getUserNickname()
      } catch (error) {
        useToast({ text: '댓글 전송 중 오류가 발생했습니다.' })
      }
    }
  }

  return (
    <>
      {commentData && (
        <div className='mx-auto w-full max-w-2xl rounded-lg bg-gray-100 dark:bg-gray-700 p-6'>
          <div className='mb-4'>
            {commentData.results?.length > 0 ? (
              commentData.results.map((item: any) => (
                <div className='mb-2' key={item.id}>
                  <div className='flex'>
                    <div className='text-[#4150a6] font-bold mr-2'>
                      {getCommentInfo(item?.rich_text[0]?.plain_text, 1)}
                    </div>
                    <div className='text-gray-400'>
                      {getFormatDate(item?.created_time) || ''}
                    </div>
                  </div>
                  <div className='mt-2 dark:text-white'>
                    {getCommentInfo(item?.rich_text[0]?.plain_text, 0)}
                  </div>
                </div>
              ))
            ) : (
              <div className='flex justify-center w-full'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-12 flex justify-center w-full mb-2 fill-gray-400 dark:fill-white'
                  >
                    <path
                      fillRule='evenodd'
                      d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <div className='dark:text-white text-center text-gray-400 text-xs'>
                    댓글이 없습니다.
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='flex w-full justify-between mb-1.5'>
            <div className='w-full'>
              <div className='flex'>
                <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
                  </svg>
                </span>
                <div className='relative w-full'>
                  <input
                    type='text'
                    id='website-admin'
                    className='rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-[#4150a6] focus:border-[#4150a6] block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#4150a6] dark:focus:border-[#4150a6]'
                    placeholder='이름을 입력해 주세요.'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <button
                    onClick={getUserNickname}
                    className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:hover:text-white focus:outline-none'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <button
              type='button'
              className='w-1/8 ml-4 text-white bg-[#4150a6] hover:bg-[#1c2349] ml-4 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#1c2349] dark:hover:bg-[#4150a6] focus:outline-none'
              onClick={handleConfirmComment}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-6'
              >
                <path d='M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z' />
              </svg>
            </button>
          </div>
          <div>
            <input
              type='text'
              id='default-input'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='댓글을 입력해 주세요.'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  )
}
