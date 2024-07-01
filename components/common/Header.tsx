'use client'

import React from 'react'
import Link from 'next/link'
import { useToast } from '@/hooks/useToast'

export default function Header() {
  const GITHUB_URL = 'https://github.com/kohigowild'

  return (
    <header className='flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
      <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
        <Link href='/'>
          <div className='text-2xl font-extrabold relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[4px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[4px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'>
            <span>@KOTHUB</span>
          </div>
        </Link>
        <div className='flex max-lg:ml-auto space-x-3'>
          <button
            onClick={() => useToast({ text: '준비 중입니다.' })}
            className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#4150A6] bg-[#4150A6] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#4150A6]'
          >
            Portfolio
          </button>
          <Link
            href={GITHUB_URL}
            target='_blank'
            className='px-4 py-3 text-sm rounded-full font-bold text-white border-2 border-[#4150A6] bg-[#4150A6] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#4150A6]'
          >
            GitHub
          </Link>
        </div>
      </div>
    </header>
  )
}
