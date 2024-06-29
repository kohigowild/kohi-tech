'use client'

import { useEffect, useState } from 'react'
export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/notion')
        const result = await response.json()
        console.log(result)
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>My Blog Posts</h1>
    </div>
  )
}
