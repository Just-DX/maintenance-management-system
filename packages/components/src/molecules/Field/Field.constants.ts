export const fieldVariants = {
  states: ['default', 'error', 'disabled'] as const,
}

export const fieldStyles = {
  root: 'flex flex-col gap-2',
  labelWrapper: 'flex items-center gap-1',
  required: 'text-destructive',
  description: 'text-sm text-muted-foreground',
  error: 'text-sm text-destructive',
} as const
