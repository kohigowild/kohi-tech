'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const GITHUB_URL = 'https://github.com/kohigowild'

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
            <span>@KOTHUB</span>
          </div>
        </Link>
        <div className='flex max-lg:ml-auto space-x-3'>
          <button
            onClick={handleToggleButton}
            className='h-12 w-12 rounded-lg p-2'
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
          <Link
            href={GITHUB_URL}
            target='_blank'
            className='h-12 w-12 rounded-lg p-2 '
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              viewBox='0 0 24 24'
              className='cursor-pointer transition-all ease-in-out hover:scale-110 dark:fill-white'
            >
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}
