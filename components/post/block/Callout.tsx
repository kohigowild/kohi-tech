import React from 'react'
import { convertMarkdownToJSX } from '@/utils/convertMarkdownToJSX'

interface Props {
  parent: string
}

export default function Callout(props: Props) {
  const { parent } = props
  const string = parent.replace(/^\s*>+\s?/gm, '')

  return (
    <div className='flex p-4 text-sm text-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-400'>
      <div>
        <span className='font-medium'>{convertMarkdownToJSX(string)}</span>
      </div>
    </div>
  )
}
