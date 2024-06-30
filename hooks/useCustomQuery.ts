import { useQuery as useReactQuery, QueryKey } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { isLoadingState } from '@/atoms/isLoadingState'

type QueryFnResult<Data> = Promise<Data>

type UseCustomQueryResult<Data, Error> = {
  data: Data | undefined
  error: Error | null
  isLoading: boolean
}

export const useCustomQuery = <Data, Error>(
  queryKey: QueryKey,
  queryFn: () => QueryFnResult<Data>,
  config?: any
): UseCustomQueryResult<Data, Error> => {
  const setIsLoading = useSetRecoilState(isLoadingState)

  const { data, error, ...rest } = useReactQuery<Data, Error>(
    queryKey,
    async () => {
      setIsLoading(true)
      try {
        return await queryFn()
      } finally {
        setIsLoading(false)
      }
    },
    config
  )

  return {
    data,
    error,
    ...rest,
  }
}
