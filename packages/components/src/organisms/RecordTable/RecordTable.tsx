import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

import { EmptyStateTable } from '../../atoms/EmptyState'
import { Skeleton } from '../../atoms/Skeleton'
import { Table } from '../../atoms/Table'
import { cn } from '../../lib/utils'
import { TablePagination } from '../../molecules/TablePagination'
import { defaultRecordTablePageSizes, recordTableStyles } from './RecordTable.constants'
import type { RecordTableProps } from './RecordTable.types'

function RecordTableSkeleton({ columns }: { columns: number }) {
  return (
    <div className={recordTableStyles.tableWrapper}>
      <div className={recordTableStyles.skeleton.header}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className={recordTableStyles.skeleton.headerCell} />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <div key={rowIndex} className={recordTableStyles.skeleton.row}>
          {Array.from({ length: columns }).map((_, cellIndex) => (
            <Skeleton key={cellIndex} className={recordTableStyles.skeleton.cell} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function RecordTable<T extends { id: string | number }>({
  data,
  columns,
  isLoading = false,
  emptyState,

  page = 1,
  pageSize = 10,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = defaultRecordTablePageSizes,
  showPagination = true,

  sortColumn,
  sortDirection,
  onSortChange,

  toolbar,

  className,
}: RecordTableProps<T>) {
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
      return <ArrowUpDown className={recordTableStyles.sortIcon} />
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className={recordTableStyles.sortIcon} />
    ) : (
      <ArrowDown className={recordTableStyles.sortIcon} />
    )
  }

  if (isLoading) {
    return (
      <div className={cn(recordTableStyles.root, className)}>
        {toolbar}
        <RecordTableSkeleton columns={columns.length} />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className={cn(recordTableStyles.root, className)}>
        {toolbar}
        <div className={recordTableStyles.tableWrapper}>
          {emptyState ?? <EmptyStateTable title="No results found" />}
        </div>
      </div>
    )
  }

  return (
    <div className={cn(recordTableStyles.root, className)}>
      {toolbar}
      <div className={recordTableStyles.tableWrapper}>
        <Table>
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.Head key={column.id} className={column.className}>
                  {column.sortable && onSortChange ? (
                    <button
                      type="button"
                      className={recordTableStyles.sortButton}
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
          className={recordTableStyles.pagination}
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

RecordTable.displayName = 'RecordTable'
