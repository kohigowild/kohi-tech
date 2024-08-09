import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import dotenv from 'dotenv'
import fs from 'fs'
import { join } from 'path'
import { MdBlock } from 'notion-to-md/build/types'

dotenv.config()

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_TOKEN })
const n2m = new NotionToMarkdown({ notionClient: notion })

interface Metadata {
  id: string
  title: string
  category: string
  created_time: string
  preview: string
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
  // 페이지의 Markdown 블록을 가져옵니다.
  const blocks: MdBlock[] = await n2m.pageToMarkdown(pageId)
  const markdownString: string = n2m.toMarkdownString(blocks).parent || ''

  // 페이지의 메타데이터를 가져옵니다.
  const page = (await notion.pages.retrieve({ page_id: pageId })) as any

  // 페이지의 속성을 접근하는 방법을 확인합니다.
  const { 이름, preview, category } = page?.properties

  // 메타데이터를 추출하여 구성합니다.
  const metadata: Metadata = {
    id: page.id || '',
    category: category?.multi_select[0]?.name || '',
    title: 이름.title[0]?.plain_text || '',
    created_time: page.created_time,
    preview: preview?.rich_text[0]?.plain_text || '',
  }
  return {
    metadata,
    markdown: markdownString, // Markdown 문자열을 반환합니다.
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

    articles.forEach(({ metadata, markdown }, index) => {
      const fileName = metadata.id

      // 파일 작성
      const error = writeArticleMarkdown(
        fileName,
        markdown // 각 블록을 개별적으로 파일에 저장
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
