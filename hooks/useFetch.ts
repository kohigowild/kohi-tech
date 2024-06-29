interface UseFetchProps {
  url: string
  options?: any
}

export const useFetch = async ({ url, options }: UseFetchProps) => {
  try {
    const res = await fetch(url, options)
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    const result = await res.json()
    console.log(result)
    return result
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
