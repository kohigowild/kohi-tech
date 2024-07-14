export const sendCommentRequest = async (
  pageId: string,
  content: string,
  user: string
) => {
  try {
    const response = await fetch('/api/comments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pageId, content, user }),
    })

    if (!response.ok) {
      throw new Error('Failed to create comment')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating comment:', error)
    throw error
  }
}
