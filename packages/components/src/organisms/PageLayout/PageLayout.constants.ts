import { cva } from 'class-variance-authority'

export const pageLayoutVariants = cva('flex flex-col', {
  variants: {
    variant: {
      default: 'gap-6',
      list: 'gap-4',
      detail: 'gap-8',
    },
    maxWidth: {
      sm: 'max-w-screen-sm mx-auto',
      md: 'max-w-screen-md mx-auto',
      lg: 'max-w-screen-lg mx-auto',
      xl: 'max-w-screen-xl mx-auto',
      full: 'w-full',
    },
    padding: {
      none: '',
      default: 'px-6',
      compact: 'px-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    maxWidth: 'full',
    padding: 'default',
  },
})

export const pageLayoutStyles = {
  header: 'shrink-0',
  content: 'flex-1',
} as const
