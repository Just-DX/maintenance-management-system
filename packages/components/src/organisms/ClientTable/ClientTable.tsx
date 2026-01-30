import { useMemo, useState } from 'react'

import { RecordTable } from '../RecordTable/RecordTable'
import { defaultRecordTablePageSizes } from '../RecordTable/RecordTable.constants'
import type { ClientTableProps } from './ClientTable.type'


/**
 * A wrapper around RecordTable that handles pagination and sorting client-side.
 * It takes the full dataset and manages the slicing and ordering internally.
 */
export function ClientTable<T extends { id: string | number }>({
  data,
  initialPage = 1,
  initialPageSize = 10,
  initialSort,
  pageSizeOptions = defaultRecordTablePageSizes,
  ...props
}: ClientTableProps<T>) {
  // State
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [sortConfig, setSortConfig] = useState<{
    column: string
    direction: 'asc' | 'desc'
  } | null>(initialSort ?? null)

  // Derived State: Sorted Data
  const sortedData = useMemo(() => {
    if (!sortConfig) return data

    // Create a shallow copy to sort
    const sorted = [...data].sort((a, b) => {
      // We cast the column string to keyof T to access the property
      const columnKey = sortConfig.column as keyof T
      const aValue = a[columnKey]
      const bValue = b[columnKey]

      if (aValue === bValue) return 0

      // Handle null/undefined
      if (aValue == null) return 1
      if (bValue == null) return -1

      // String comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue)
        return sortConfig.direction === 'asc' ? comparison : -comparison
      }

      // Number/Boolean/Date comparison
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }

      return 0
    })

    return sorted
  }, [data, sortConfig])

  // Derived State: Paginated Data
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    return sortedData.slice(startIndex, endIndex)
  }, [sortedData, page, pageSize])

  // Handlers
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setPage(1) // Reset to first page when changing page size
  }

  const handleSortChange = (columnId: string, direction: 'asc' | 'desc') => {
    setSortConfig({ column: columnId, direction })
  }

  // Ensure current page is valid if data shrinks
  // Effect not strictly needed if we reset page on data change but typically data change might just be a refresh.
  // We'll keep it simple for now.

  return (
    <RecordTable
      {...props}
      data={paginatedData}
      total={data.length}
      page={page}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      pageSizeOptions={pageSizeOptions}
      sortColumn={sortConfig?.column}
      sortDirection={sortConfig?.direction}
      onSortChange={handleSortChange}
      footer={props.footer}
    />
  )
}

ClientTable.displayName = 'ClientTable'
