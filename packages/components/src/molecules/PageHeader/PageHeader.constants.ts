export const pageHeaderVariants = {
  sizes: ['default', 'sm', 'lg'] as const,
}

export const pageHeaderStyles = {
  root: 'flex flex-col gap-1',
  breadcrumb: 'mb-2',
  header: 'flex items-start justify-between gap-4',
  content: 'flex-1 min-w-0',
  title: 'text-2xl font-semibold tracking-tight',
  description: 'text-sm text-muted-foreground mt-1',
  actions: 'flex items-center gap-2 shrink-0',
} as const
