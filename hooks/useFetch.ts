import { useQuery, UseQueryOptions } from '@tanstack/react-query'

interface UseFetchProps {
  url: string
  options?: RequestInit
}

async function fetchData({ url, options }: UseFetchProps) {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export function useFetch<TData>(
  url: string,
  options?: RequestInit,
  queryOptions?: UseQueryOptions<TData, Error, TData, [string, RequestInit?]>
) {
  return useQuery<TData, Error>(['fetch', url], () =>
    fetchData({ url, options })
  )
}
