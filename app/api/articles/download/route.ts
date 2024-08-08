import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import dotenv from 'dotenv'
import fs from 'fs'
import { join } from 'path'
import { MdBlock, MdStringObject } from 'notion-to-md/build/types' // 필요한 타입을 가져옵니다.

dotenv.config()

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_TOKEN })
const n2m = new NotionToMarkdown({ notionClient: notion })

interface Metadata {
  title: { title: { plain_text: string }[] }
  date?: { date?: { start?: string } }
}

// 아티클 ID 목록 가져오기
async function getArticleIds(): Promise<string[]> {
  const db = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_DATABASE_ID as string,
  })
  return db.results.map(({ id }) => id)
}

// 아티클 메타데이터와 상세 내용 가져오기
async function getArticleDetail(
  pageId: string
): Promise<{ metadata: Metadata; markdown: string }> {
  const blocks: MdBlock[] = await n2m.pageToMarkdown(pageId) // MdBlock 타입의 블록을 가져옵니다.
  const markdownString = n2m.toMarkdownString(blocks) // 블록을 문자열로 변환합니다.

  // Fetch metadata separately if needed
  const metadata = { title: { title: [{ plain_text: 'Sample Title' }] } } // Adjust this based on actual metadata fetch

  return {
    metadata,
    markdown: JSON.stringify(markdownString), // 문자열로 변환된 markdown을 반환
  }
}

// Markdown 파일 생성
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
      const metadataString = `---
title: ${metadata.title.title[0].plain_text}
date: ${metadata.date?.date?.start || 'Unknown'}
---
`

      const error = writeArticleMarkdown(
        metadata.title.title[0].plain_text.toLowerCase().replace(/ /g, '-'),
        metadataString + markdown // 여기에 제대로 된 markdown 문자열을 추가
      )

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
