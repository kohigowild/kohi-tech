'use client'

import React from 'react'
import Link from 'next/link'
import { convertMarkdownToJSX } from '@/utils/convertMarkdownToJSX'

interface Props {
  parent: string
  isLink: boolean
}

export default function Paragraph(props: Props) {
  const { parent, isLink } = props

  return isLink ? (
    <Link
      href={parent}
      className='leading-normal text-justify text-blue-600 dark:text-blue-500 hover:underline'
    >
      {convertMarkdownToJSX(parent)}
    </Link>
  ) : (
    <div className='mb-3 text-gray-600 dark:text-gray-400 leading-normal text-justify'>
      {convertMarkdownToJSX(parent)}
    </div>
  )
}
