import Link from 'next/link'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { category, CategoryIndex } from '@/atoms/category'

export default function Category() {
  const categoryValue = useRecoilValue(category)

  return (
    <>
      {categoryValue?.length > 0 && (
        <nav className='bg-gray-50 dark:bg-gray-700 rounded-md md:mt-6'>
          <div className='max-w-screen-xl px-4 py-3 mx-auto'>
            <div className='flex items-center'>
              <ul className='flex flex-row font-medium px-3 mt-0 space-x-8 rtl:space-x-reverse text-sm'>
                <li>
                  <Link
                    href='/'
                    className='text-gray-900 dark:text-white hover:text-[#4150A6]'
                    aria-current='page'
                  >
                    All
                  </Link>
                </li>
                {categoryValue.map((category: CategoryIndex) => (
                  <li key={category?.index || ''}>
                    <Link
                      href={{
                        pathname: '/',
                        query: { category: category?.index || '' },
                      }}
                      className='text-gray-900 dark:text-white hover:text-[#4150A6]'
                    >
                      {category?.category || ''}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  )
}
