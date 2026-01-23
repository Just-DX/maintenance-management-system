export const defaultPageSizeOptions = [10, 20, 50] as const

export const tablePaginationStyles = {
  root: 'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
  info: 'text-sm text-muted-foreground',
  controls: 'flex items-center gap-6',
  pageSize: 'flex items-center gap-2',
  pageSizeLabel: 'text-sm text-muted-foreground hidden sm:block',
  pageSizeSelect: 'w-16',
  navigation: 'flex items-center gap-1',
} as const
