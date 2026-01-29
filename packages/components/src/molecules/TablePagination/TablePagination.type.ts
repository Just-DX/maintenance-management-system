import type { HTMLAttributes } from 'react'

export interface TablePaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: readonly number[]
  showPageSize?: boolean
  showInfo?: boolean
}
