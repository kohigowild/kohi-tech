import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'

interface ArticleProps {
  params: {
    slug: string
  }
}

export default async function PostBody({ params }: ArticleProps) {
  const { slug } = params

  // 서버에서 파일 시스템 접근
  const articlesDirectory = path.join(process.cwd(), 'articles')
  const filePath = path.join(articlesDirectory, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data: frontMatter, content } = matter(fileContents)

  return (
    <div className='prose'>
      <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
    </div>
  )
}

export async function generateStaticParams() {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  const filenames = fs.readdirSync(articlesDirectory)

  return filenames.map((filename) => {
    return {
      slug: filename.replace(/\.md$/, ''),
    }
  })
}
