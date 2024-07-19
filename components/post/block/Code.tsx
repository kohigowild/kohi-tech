import React from 'react'

interface Props {
  parent: string
}

export default function Code(props: Props) {
  const { parent } = props
  const string = parent.replace(/^```([\s\S]*)```$/, '$1')

  const lang = parent.split('\n')[0]
  const code = parent.split('\n').slice(1).join('\n')
  return (
    <div className='max-w-3xl mx-auto mt-8'>
      <pre className='bg-gray-800 rounded-lg p-6'>
        <code className='block text-sm font-mono text-white'>{code}</code>
      </pre>
    </div>
  )
}
