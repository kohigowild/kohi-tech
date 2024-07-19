import React from 'react'
import { convertMarkdownToJSX } from '@/utils/convertMarkdownToJSX'

interface Props {
  parent: string
  children: any
}

export default function Bullet(props: Props) {
  const { parent, children } = props

  const regexFiltered = (string: string) => {
    return string.replace(/^\s*[-+*]\s+/gm, '')
  }
  return (
    <ul className='space-y-1 text-gray-600 list-disc list-inside dark:text-gray-400'>
      <li>
        {convertMarkdownToJSX(regexFiltered(parent))}
        {children?.length > 0 && (
          <ul className='ml-6 mt-2 text-gray-600 list-disc list-inside dark:text-gray-400'>
            {children?.map((item: any) => (
              <li>{convertMarkdownToJSX(regexFiltered(item.parent))} </li>
            ))}
          </ul>
        )}
      </li>
    </ul>
  )
}
