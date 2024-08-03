import React from 'react'
import { convertMarkdownToJSX } from '@/utils/convertMarkdownToJSX'

interface Props {
  parent: string
  type: string
}

export default function Heading(props: Props) {
  const { parent, type } = props
  const string = parent.replace(/#+\s*(.*?)(\n|$)/g, '$1\n')

  return (
    <>
      {type === 'h1' && (
        <h1 className='text-5xl pt-4 pb-2 text-gray-700 font-extrabold dark:text-white'>
          {convertMarkdownToJSX(string)}
        </h1>
      )}
      {type === 'h2' && (
        <h2 className='text-4xl pt-4 pb-2 text-gray-700 font-bold dark:text-white'>
          {convertMarkdownToJSX(string)}
        </h2>
      )}
      {type === 'h3' && (
        <h3 className='text-3xl pt-4 pb-2 text-gray-700 font-bold dark:text-white'>
          {convertMarkdownToJSX(string)}
        </h3>
      )}
    </>
  )
}
