import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import type { NextApiRequest, NextApiResponse } from 'next'

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_TOKEN })
const n2m = new NotionToMarkdown({
  notionClient: notion,
})

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params
  try {
    const blocks = await n2m.pageToMarkdown(slug)
    // const mdString = n2m.toMarkdownString(mdblocks)
    return new Response(JSON.stringify(blocks), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
    })
  } catch (error) {
    console.error(error)
  }
}
