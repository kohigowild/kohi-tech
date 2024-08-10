import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import dotenv from 'dotenv'
import fs from 'fs'
import { join } from 'path'
import { MdBlock } from 'notion-to-md/build/types'
import { getFormatDate } from '@/utils/dateFormat'

dotenv.config()

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_TOKEN })
const n2m = new NotionToMarkdown({ notionClient: notion })

interface Metadata {
  id: string
  title: string
  category: string
  created_time: string
}

// 아티클 ID 목록 가져오기
async function getArticleIds(): Promise<string[]> {
  const db = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_DATABASE_ID as string,
  })
  return db.results.map(({ id }) => id)
}

async function getArticleDetail(
  pageId: string
): Promise<{ metadata: Metadata; markdown: string }> {
  const blocks: MdBlock[] = await n2m.pageToMarkdown(pageId)
  const imageBlockMap: Map<string, string> = new Map()

  blocks.forEach((block) => {
    if (block.type === 'image') {
      const imageUrlMatch = block.parent.match(
        /http.*?\.(jpg|jpeg|png|gif|bmp)/
      )
      if (imageUrlMatch) {
        const imageUrl = imageUrlMatch[0]
        const src = `https://boiling-politician-9bc.notion.site/image/${encodeURIComponent(
          imageUrl
        )}?table=block&id=${block.blockId}&cache=v2`

        imageBlockMap.set(block.parent, `![Image](${src})`)
      }
    }
  })

  let markdownString = n2m.toMarkdownString(blocks).parent || ''

  imageBlockMap.forEach((replacement, originalUrl) => {
    const escapedUrl = originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escapedUrl, 'g')
    markdownString = markdownString.replace(regex, replacement)
  })

  const page = (await notion.pages.retrieve({ page_id: pageId })) as any

  const { 이름, category } = page?.properties

  const metadata: Metadata = {
    id: page.id || '',
    category: category?.multi_select[0]?.name || '',
    title: 이름.title[0]?.plain_text || '',
    created_time: getFormatDate(page.created_time),
  }

  return {
    metadata,
    markdown: markdownString,
  }
}

function writeArticleMarkdown(
  title: string,
  markdownString: string
): string | null {
  try {
    const dirPath = join(process.cwd(), 'articles')
    const filePath = join(dirPath, `${title}.md`)

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    fs.writeFileSync(filePath, markdownString)
    return null
  } catch (error: any) {
    return error.message
  }
}

export async function GET(req: NextRequest) {
  try {
    let errors: string[] = []

    const articleIds = await getArticleIds()
    const articles = await Promise.all(
      articleIds.map(async (id: string) => await getArticleDetail(id))
    )

    articles.forEach(({ metadata, markdown }) => {
      const fileName = metadata.id

      const metadataString = `---
title: ${metadata.title}
category: ${metadata.category}
created_time: ${metadata.created_time}
---
`

      const error = writeArticleMarkdown(fileName, metadataString + markdown)

      if (error) {
        errors.push(error)
      }
    })

    const successCount = articles.length - errors.length

    return NextResponse.json({
      message: `아티클 다운로드가 완료되었습니다 📃 성공: ${successCount} / 실패: ${errors.length}`,
      errors: errors.length > 0 ? errors : null,
    })
  } catch (error: any) {
    console.error('마크다운을 불러오는 도중 오류가 발생했습니다:', error)
    return NextResponse.json(
      {
        error: '마크다운을 불러오는 도중 오류가 발생했습니다.',
        details: error.message,
      },
      {
        status: 500,
      }
    )
  }
}
