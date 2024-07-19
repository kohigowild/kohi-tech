import React from 'react'
import { convertMarkdownToJSX } from '@/utils/convertMarkdownToJSX'

interface Props {
  parent: string
}

export default function Bullet(props: Props) {
  const { parent } = props
  const string = parent.replace(/^\s*[-+*]\s+/gm, '')

  return (
    <ul className='space-y-1 text-gray-600 list-disc list-inside dark:text-gray-400'>
      <li>{convertMarkdownToJSX(string)}</li>
    </ul>
  )
}
