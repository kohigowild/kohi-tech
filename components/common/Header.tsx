'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { sideNavOpen } from '@/atoms/sideNavOpen'

export default function Header() {
  const [isOpen, setIsOpen] = useRecoilState(sideNavOpen)

  const handleToggleButton = () => {
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.removeItem('theme')
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <header className='flex shadow-md py-4 px-4 sm:px-10 bg-white dark:bg-gray-900 font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
      <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
        <Link href='/'>
          <div className='text-2xl font-extrabold relative text-black dark:text-white cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black dark:before:bg-white before:origin-center before:h-[4px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black dark:after:bg-white after:origin-center after:h-[4px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'>
            <span>KOHI TECH</span>
          </div>
        </Link>
        <div className='flex max-lg:ml-auto space-x-3'>
          <button
            onClick={handleToggleButton}
            className='h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            <svg
              className='fill-[#4150A6] block dark:hidden transition-all ease-in-out hover:scale-110'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
            </svg>
            <svg
              className='fill-yellow-500 hidden dark:block transition-all ease-in-out hover:scale-110'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                fillRule='evenodd'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            {!isOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='block transition-all ease-in-out hover:scale-110 dark:fill-gray-100'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='block transition-all ease-in-out hover:scale-110 dark:stroke-gray-100'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18 18 6M6 6l12 12'
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
