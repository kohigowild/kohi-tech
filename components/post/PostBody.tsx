import React from 'react'
import Image from 'next/image'

import Heading from '@/components/post/block/Heading'
import Paragraph from '@/components/post/block/Paragraph'
import Bullet from '@/components/post/block/Bullet'
import Callout from '@/components/post/block/Callout'
import Quote from '@/components/post/block/Quote'
import Code from '@/components/post/block/Code'
import Table from '@/components/post/block/Table'

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
    | 'table'
  blockId: string
  parent: string
  children: BlockType[]
}

interface BlockProps {
  type: BlockType['type']
  parent: BlockType['parent']
  blockId: BlockType['blockId']
  children: BlockType['children']
}

const Block: React.FC<BlockProps> = ({ type, parent, children, blockId }) => {
  switch (type) {
    case 'heading_1':
      return <Heading parent={parent} type='h1' />
    case 'heading_2':
      return <Heading parent={parent} type='h2' />
    case 'heading_3':
      return <Heading parent={parent} type='h3' />
    case 'paragraph':
      let isLink = false
      if (parent.match(/\[([^\]]+)\]\(([^)]+)\)/g)) {
        isLink = true
        parent = parent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
      }
      return <Paragraph parent={parent} isLink={isLink} />
    case 'bulleted_list_item':
      return <Bullet parent={parent} children={children} />
    case 'callout':
      return <Callout parent={parent} />
    case 'quote':
      return <Quote parent={parent} />
    case 'divider':
      return <hr className='border-gray-400 dark:border-white' />
    case 'image':
      parent = parent.match(/http.*?\.(jpg|jpeg|png|gif|bmp)/)?.[0] || ''
      const src = `https://boiling-politician-9bc.notion.site/image/${encodeURIComponent(
        parent
      )}?table=block&id=${blockId}&cache=v2`
      return (
        <Image
          src={src}
          alt='kohi tech'
          sizes='(max-width: 1920px) 100vw, 1920px'
          width={1920}
          height={1080}
        />
      )
    case 'code':
      return <Code parent={parent} />
    case 'table':
      return <Table parent={parent} />
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
            <Block
              type={block.type}
              parent={block.parent}
              children={block.children}
              blockId={block.blockId}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
