'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useRecoilState, useRecoilValue } from 'recoil'
import { category, CategoryIndex } from '@/atoms/category'
import { sideNavOpen } from '@/atoms/sideNavOpen'

export default function SideNav() {
  const categoryValue = useRecoilValue(category)
  const [isOpen, setIsOpen] = useRecoilState(sideNavOpen)
  const router = useRouter()
  const GITHUB_URL = 'https://github.com/kohigowild'
  const INSTAGRAM_URL = 'https://www.instagram.com/mainmirror'

  const searchParams = useSearchParams()
  const categoryQ = searchParams.get('category')
  const pageQ = searchParams.get('page')

  const handleClickCategory = (category: CategoryIndex) => {
    const query = { category: category?.index || '', page: 1 }

    if (category.index === 0) {
      router.push(`/?page=${query.page}`)
    } else {
      router.push(`/?category=${query.category}&page=${query.page}`)
    }
    setIsOpen(false)
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-[#4150A6] text-white w-full sm:w-80 transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <button className='h-6 w-6 m-4' onClick={() => setIsOpen(false)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='white'
          className='block transition-all ease-in-out hover:scale-110'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18 18 6M6 6l12 12'
          />
        </svg>
      </button>
      <nav className='mt-10'>
        <div className='w-full flex justify-center'>
          <div>
            <Image
              src={'/kohi.jpeg'}
              alt='kohi'
              sizes='(max-width: 1920px) 100vw, 1920px'
              width={200}
              height={200}
              priority
              style={{ borderRadius: '500%' }}
            />
            <div className='w-full flex justify-center pt-4 pb-2'>
              Hello, I'm KOHI 🙂‍↕️
            </div>
            <div className='w-full flex justify-center'>
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
                  className='cursor-pointer transition-all ease-in-out hover:scale-110 fill-white mt-1'
                >
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
              </Link>
              <Link
                href={INSTAGRAM_URL}
                target='_blank'
                className='h-12 w-12 rounded-lg p-2 '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='38'
                  height='38'
                  viewBox='0 0 24 24'
                  className='cursor-pointer transition-all ease-in-out hover:scale-110 fill-white'
                >
                  <path d='M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 17 6 C 17.552 6 18 6.448 18 7 C 18 7.552 17.552 8 17 8 C 16.448 8 16 7.552 16 7 C 16 6.448 16.448 6 17 6 z M 12 7 C 14.757 7 17 9.243 17 12 C 17 14.757 14.757 17 12 17 C 9.243 17 7 14.757 7 12 C 7 9.243 9.243 7 12 7 z M 12 9 A 3 3 0 0 0 12 15 A 3 3 0 0 0 12 9 z'></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <ul className='mt-4'>
          <li
            className='px-12 py-4 cursor-pointer hover:bg-[#1c2349]'
            onClick={() => handleClickCategory({ category: '', index: 0 })}
          >
            <span className='text-white hover:scale-110'>All</span>
          </li>
          {categoryValue.map((category: CategoryIndex) => (
            <li
              className='px-12 py-4 cursor-pointer hover:bg-[#1c2349]'
              key={category?.index || ''}
              onClick={() => handleClickCategory(category)}
            >
              <span className='text-white hover:scale-110'>
                {category?.category || ''}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
