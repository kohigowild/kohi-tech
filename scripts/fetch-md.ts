import fetch from 'node-fetch'

async function fetchArticles() {
  try {
    const response = await fetch('http://localhost:3000/api/articles/download')
    const data = await response.json()

    if (data.errors) {
      console.error('Errors:', data.errors)
      return
    }

    console.log('Articles fetched and saved successfully')
  } catch (error) {
    console.error('Failed to fetch articles:', error)
  }
}

fetchArticles()
