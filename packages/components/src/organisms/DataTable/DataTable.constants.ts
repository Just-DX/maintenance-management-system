export const defaultDataTablePageSizes = [10, 20, 50] as const

export const dataTableStyles = {
  root: 'space-y-4',
  tableWrapper: 'rounded-md border',
  skeleton: {
    header: 'flex items-center gap-4 p-2 border-b',
    headerCell: 'h-4 flex-1',
    row: 'flex items-center gap-4 p-2 border-b last:border-b-0',
    cell: 'h-4 flex-1',
  },
  sortButton:
    'flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer select-none',
  sortIcon: 'h-4 w-4',
  pagination: 'pt-2',
} as const
