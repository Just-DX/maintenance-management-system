import { useQuery } from '@tanstack/react-query'

import { getWorkOrderDetail } from '@features/work-orders'

export function useWorkOrderDetail(id: string) {
  const query = useQuery({
    queryKey: ['work-order', id],
    queryFn: () => getWorkOrderDetail(id),
    enabled: !!id,
  })

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}
