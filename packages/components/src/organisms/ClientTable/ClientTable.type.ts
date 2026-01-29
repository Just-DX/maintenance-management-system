import type { ColumnDef, RecordTableProps } from '../RecordTable/RecordTable.type'

export interface ClientTableProps<T> extends Omit<
  RecordTableProps<T>,
  | 'data'
  | 'page'
  | 'total'
  | 'onPageChange'
  | 'onPageSizeChange'
  | 'sortColumn'
  | 'sortDirection'
  | 'onSortChange'
> {
  /**
   * The full dataset to be displayed, paginated, and sorted client-side.
   */
  data: T[]

  /**
   * Initial page number (1-indexed).
   * @default 1
   */
  initialPage?: number

  /**
   * Initial page size.
   * @default 10
   */
  initialPageSize?: number

  /**
   * Initial sort configuration.
   */
  initialSort?: {
    column: string
    direction: 'asc' | 'desc'
  }
}

export type { ColumnDef }
