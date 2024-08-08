import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

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
    const md = n2m.toMarkdownString(blocks)
    return new Response(JSON.stringify(md), {
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
