import fs from 'fs'
import path from 'path'
import ReactMarkdown, { Components } from 'react-markdown'
import { notFound } from 'next/navigation'
import remarkGfm from 'remark-gfm'
import matter from 'gray-matter'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import ArticleHeader from '@/components/post/ArticleHeader'
import Comment from '@/components/post/Comment'
import FooterNavigation from '@/components/post/FooterNavigation'

interface ArticleProps {
  params: {
    slug: string
  }
}

interface CodeProps {
  node?: any
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

export default async function Page({ params }: ArticleProps) {
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
    <>
      <main className='pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased'>
        <div className='flex justify-between px-4 mx-auto max-w-screen-xl'>
          <article className='mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert'>
            <ArticleHeader frontMatter={frontMatter} />
            <div>
              <div className='prose'>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({
                      node,
                      inline,
                      className,
                      children,
                      ...props
                    }: CodeProps) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          className='code-block'
                          style={materialDark}
                          language={match[1]}
                          PreTag='div'
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
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
