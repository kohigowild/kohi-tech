import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_TOKEN })

export async function GET() {
  try {
    const res = await notion.databases.query({
      database_id: process.env.NEXT_PUBLIC_DATABASE_ID || '',
    })

    return new Response(JSON.stringify(res), {
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
