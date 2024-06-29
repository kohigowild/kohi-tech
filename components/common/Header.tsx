import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
      <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
        <Link href='/'>
          <span>@KOTHUB</span>
        </Link>
        <div className='flex max-lg:ml-auto space-x-3'>
          <button className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#4150A6] bg-[#4150A6] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#4150A6]'>
            Portfolio
          </button>
          <button className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#4150A6] bg-[#4150A6] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#4150A6]'>
            GitHub
          </button>
        </div>
      </div>
    </header>
  )
}
