import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_TOKEN })

export async function POST(req: NextRequest) {
  const { pageId, content, user } = await req.json()

  if (!pageId || !content || !user) {
    return NextResponse.json(
      { error: 'pageId, content, and user are required' },
      { status: 400 }
    )
  }

  try {
    const response = await notion.comments.create({
      parent: {
        page_id: pageId,
      },
      rich_text: [
        {
          text: {
            content: `${content} || ${user}`,
          },
        },
      ],
    })

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
