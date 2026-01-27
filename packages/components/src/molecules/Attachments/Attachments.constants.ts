// Attachments Styles and Constants

export const attachmentsStyles = {
  // Empty state
  empty:
    'flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center',

  // List variant
  list: 'space-y-2',
  listItem:
    'flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/50',
  listIcon: 'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted',
  listInfo: 'min-w-0 flex-1',
  listActions: 'flex items-center gap-1',

  // Grid variant
  grid: 'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4',
  gridItem: 'group flex flex-col overflow-hidden rounded-lg border bg-card',
  gridThumbnail: 'relative flex h-32 items-center justify-center bg-muted',
  gridOverlay:
    'absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100',
  gridInfo: 'p-3',

  // Shared
  fileName: 'text-sm font-medium truncate',
  fileMeta: 'text-xs text-muted-foreground',
} as const
