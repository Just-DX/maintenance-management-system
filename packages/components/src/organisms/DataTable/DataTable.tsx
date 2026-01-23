import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils'
import { EmptyStateTable } from '../../atoms/EmptyState'
import { Skeleton } from '../../atoms/Skeleton'
import { Table } from '../../atoms/Table'
import { TablePagination } from '../../molecules/TablePagination'
import { dataTableStyles, defaultDataTablePageSizes } from './DataTable.constants'

export interface ColumnDef<T> {
  id: string
  header: string | React.ReactNode
  cell: (row: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

export interface DataTableProps<T> {
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

  // Styling
  className?: string
}

function DataTableSkeleton({ columns }: { columns: number }) {
  return (
    <div className={dataTableStyles.tableWrapper}>
      <div className={dataTableStyles.skeleton.header}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className={dataTableStyles.skeleton.headerCell} />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <div key={rowIndex} className={dataTableStyles.skeleton.row}>
          {Array.from({ length: columns }).map((_, cellIndex) => (
            <Skeleton key={cellIndex} className={dataTableStyles.skeleton.cell} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  isLoading = false,
  emptyState,

  page = 1,
  pageSize = 10,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = defaultDataTablePageSizes,
  showPagination = true,

  sortColumn,
  sortDirection,
  onSortChange,

  toolbar,

  className,
}: DataTableProps<T>) {
  const actualTotal = total ?? data.length
  const showPaginationSection = showPagination && actualTotal > 0

  const handleSort = (columnId: string) => {
    if (!onSortChange) return

    let newDirection: 'asc' | 'desc' = 'asc'
    if (sortColumn === columnId) {
      newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    }
    onSortChange(columnId, newDirection)
  }

  const getSortIcon = (columnId: string) => {
    if (sortColumn !== columnId) {
      return <ArrowUpDown className={dataTableStyles.sortIcon} />
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className={dataTableStyles.sortIcon} />
    ) : (
      <ArrowDown className={dataTableStyles.sortIcon} />
    )
  }

  if (isLoading) {
    return (
      <div className={cn(dataTableStyles.root, className)}>
        {toolbar}
        <DataTableSkeleton columns={columns.length} />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className={cn(dataTableStyles.root, className)}>
        {toolbar}
        <div className={dataTableStyles.tableWrapper}>
          {emptyState ?? <EmptyStateTable title="No results found" />}
        </div>
      </div>
    )
  }

  return (
    <div className={cn(dataTableStyles.root, className)}>
      {toolbar}
      <div className={dataTableStyles.tableWrapper}>
        <Table>
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.Head key={column.id} className={column.className}>
                  {column.sortable && onSortChange ? (
                    <button
                      type="button"
                      className={dataTableStyles.sortButton}
                      onClick={() => handleSort(column.id)}
                      aria-label={`Sort by ${typeof column.header === 'string' ? column.header : column.id}`}
                    >
                      {column.header}
                      {getSortIcon(column.id)}
                    </button>
                  ) : (
                    column.header
                  )}
                </Table.Head>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((row) => (
              <Table.Row key={row.id}>
                {columns.map((column) => (
                  <Table.Cell key={column.id} className={column.className}>
                    {column.cell(row)}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {showPaginationSection && onPageChange && (
        <TablePagination
          className={dataTableStyles.pagination}
          page={page}
          pageSize={pageSize}
          total={actualTotal}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          pageSizeOptions={pageSizeOptions}
          showPageSize={!!onPageSizeChange}
        />
      )}
    </div>
  )
}

DataTable.displayName = 'DataTable'
