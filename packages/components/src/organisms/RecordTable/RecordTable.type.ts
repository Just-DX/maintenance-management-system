import type * as React from 'react'

export interface BaseRecord {
  id: string | number
}

export interface ColumnDef<T> {
  id: string
  header: string | React.ReactNode
  cell: (row: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

export interface RecordTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading?: boolean
  emptyState?: React.ReactNode

  // Pagination (controlled)
  page?: number
  pageSize?: number
  total?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: readonly number[]
  showPagination?: boolean

  // Sorting (controlled, callback-only)
  sortColumn?: string
  sortDirection?: 'asc' | 'desc'
  onSortChange?: (column: string, direction: 'asc' | 'desc') => void

  // Toolbar slot
  toolbar?: React.ReactNode

  // Row click handler
  onRowClick?: (row: T) => void

  // Styling
  className?: string

  // Footer slot
  footer?: React.ReactNode
}
