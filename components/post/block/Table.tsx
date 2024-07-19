import React from 'react'

interface Props {
  parent: string
}

export default function Table(props: Props) {
  const { parent } = props

  const lines = parent.trim().split('\n')
  const headers = lines[0]
    .split('|')
    .map((header) => header.trim())
    .filter(Boolean)
  const rows = lines.slice(2).map((line) =>
    line
      .split('|')
      .map((cell) => cell.trim())
      .filter(Boolean)
  )

  return (
    <table className='min-w-full divide-y divide-gray-200'>
      <thead className='bg-gray-50'>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className='px-6 py-4 whitespace-nowrap'>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
