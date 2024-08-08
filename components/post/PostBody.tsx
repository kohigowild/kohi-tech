import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function PostBody({ data }: any) {
  return (
    <div className='prose'>
      <ReactMarkdown children={data?.parent} remarkPlugins={[remarkGfm]} />
    </div>
  )
}
