import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import PostHeader from '@/components/post/PostHeader'
import Comment from '@/components/post/Comment'
import FooterNavigation from '@/components/post/FooterNavigation'

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
    // <div>
    //   <div className='prose'>
    //     <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
    //   </div>
    // </div>
    <>
      <main className='pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased'>
        <div className='flex justify-between px-4 mx-auto max-w-screen-xl'>
          <article className='mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert'>
            <PostHeader />
            <div>
              <div className='prose'>
                <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
              </div>
            </div>
          </article>
        </div>
        <div className='flex justify-between px-4 mx-auto max-w-screen-xl mt-12'>
          <Comment />
        </div>
      </main>
      <FooterNavigation />
    </>
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
