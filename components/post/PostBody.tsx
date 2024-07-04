import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface BlockType {
  type:
    | 'paragraph'
    | 'bulleted_list_item'
    | 'callout'
    | 'heading_1'
    | 'heading_2'
    | 'heading_3'
    | 'divider'
    | 'quote'
    | 'image'
    | 'code'
  blockId: string
  parent: string
  children: BlockType[]
}

interface BlockProps {
  type: BlockType['type']
  parent: BlockType['parent']
}

// const processText = (text: string): ProcessedResult => {
//   const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
//   const boldRegex = /\*\*(.*?)\*\*/g

//   let nodeList: React.ReactNode[] = []
//   let isLink = false
//   let isBold = false
//   let lastIndex = 0

//   text.replace(linkRegex, (match, linkText, url, offset) => {
//     isLink = true
//     if (offset > lastIndex) {
//       nodeList.push(text.slice(lastIndex, offset))
//     }
//     nodeList.push(
//       <Link key={url} href={url}>
//         {linkText}
//       </Link>
//     )
//     lastIndex = offset + match.length
//     return match
//   })

//   if (lastIndex < text.length) {
//     nodeList.push(text.slice(lastIndex))
//   }

//   let elements = nodeList.flat()
//   if (text.match(boldRegex)) {
//     isBold = true,
//     elements = elements.replace(/\*\*(.*?)\*\*/g, '$1')
//   }

//   return {
//     elements
//     isLink,
//     isBold,
//   }
// }

const Block: React.FC<BlockProps> = ({ type, parent }) => {
  switch (type) {
    case 'heading_1':
      parent = parent.replace(/#+\s*(.*?)(\n|$)/g, '$1\n')
      return (
        <h1 className='text-5xl text-gray-600 font-extrabold dark:text-white'>
          {parent}
        </h1>
      )
    case 'heading_2':
      parent = parent.replace(/#+\s*(.*?)(\n|$)/g, '$1\n')
      return (
        <h2 className='text-4xl text-gray-600 font-bold dark:text-white'>
          {parent}
        </h2>
      )
    case 'heading_3':
      parent = parent.replace(/#+\s*(.*?)(\n|$)/g, '$1\n')
      return (
        <h3 className='text-3xl text-gray-600 font-bold dark:text-white'>
          {parent}
        </h3>
      )
    case 'paragraph':
      let isBold = false
      let isLink = false

      if (parent.match(/\*\*(.*?)\*\*/g)) {
        isBold = true
        parent = parent.replace(/\*\*(.*?)\*\*/g, '$1')
      }

      if (parent.match(/\[([^\]]+)\]\(([^)]+)\)/g)) {
        isLink = true
        parent = parent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
      }

      return isLink ? (
        <Link
          href={parent}
          className={`leading-normal text-justify text-blue-600 dark:text-blue-500 hover:underline ${
            isBold ? 'font-bold' : ''
          }`}
        >
          {parent}
        </Link>
      ) : (
        <p
          className={`mb-3 text-gray-600 dark:text-gray-400 leading-normal text-justify ${
            isBold ? 'font-bold' : ''
          }`}
        >
          {parent}
        </p>
      )
    case 'bulleted_list_item':
      parent = parent.replace(/^\s*[-+*]\s+/gm, '')
      return (
        <ul className='space-y-1 text-gray-600 list-disc list-inside dark:text-gray-400'>
          <li>{parent}</li>
        </ul>
      )
    case 'callout':
      parent = parent.replace(/^\s*>+\s?/gm, '')
      return (
        <div className='flex p-4 mb-4 text-sm text-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-400'>
          <div>
            <span className='font-medium'>{parent}</span>
          </div>
        </div>
      )
    case 'quote':
      parent = parent.replace(/^\s*>+\s?/gm, '')
      return (
        <blockquote className='text-xl italic font-semibold text-gray-700 dark:text-white'>
          <svg
            className='w-8 h-8 text-gray-400 dark:text-gray-600 mb-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 18 14'
          >
            <path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
          </svg>
          <p>{parent}</p>
        </blockquote>
      )
    case 'divider':
      return <hr className='border-gray-400 dark:border-white' />
    case 'image':
      parent = parent.match(/!\[.*?\]\((.*?)\)/)?.[1] || ''
      return (
        <Image
          src={parent}
          alt='kohi tech'
          layout='responsive'
          width={1920}
          height={1080}
        />
      )
    case 'code':
      parent = parent.replace(/^```([\s\S]*)```$/, '$1')
      const lang = parent.split('\n')[0]
      const code = parent.split('\n').slice(1).join('\n')
      return (
        <div className='max-w-3xl mx-auto mt-8'>
          <pre className='bg-gray-800 rounded-lg p-6'>
            <code className='block text-sm font-mono text-white'>{code}</code>
          </pre>
        </div>
      )
    default:
      return <div>{parent}</div>
  }
}

export default function PostBody({ data }: any) {
  return (
    <div>
      <div>
        {data?.map((block: any) => (
          <div className='mb-6' key={block.blockId}>
            <Block type={block.type} parent={block.parent} />
          </div>
        ))}
      </div>
    </div>
  )
}
