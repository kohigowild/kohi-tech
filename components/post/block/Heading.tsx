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
        <h1 className='text-5xl text-gray-600 font-extrabold dark:text-white'>
          {convertMarkdownToJSX(string)}
        </h1>
      )}
      {type === 'h2' && (
        <h2 className='text-4xl text-gray-600 font-bold dark:text-white'>
          {convertMarkdownToJSX(string)}
        </h2>
      )}
      {type === 'h3' && (
        <h3 className='text-3xl text-gray-600 font-bold dark:text-white'>
          {convertMarkdownToJSX(string)}
        </h3>
      )}
    </>
  )
}
