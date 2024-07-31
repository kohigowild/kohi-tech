import React from 'react'
import CodeBlock from 'rc-syntax-highlight'

interface Props {
  parent: string
}

export default function Code(props: Props) {
  const { parent } = props
  const string = parent.replace(/^```([\s\S]*)```$/, '$1')

  const lang = string.split('\n')[0]
  const code = string.split('\n').slice(1).join('\n')
  return (
    <div className='max-w-3xl mx-auto mt-8'>
      <CodeBlock lang={lang} code={code} />
    </div>
  )
}
