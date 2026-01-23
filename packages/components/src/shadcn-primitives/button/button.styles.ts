import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

/**
 * Core layout & typography
 */
const baseStyles =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium shrink-0'

/**
 * Interaction, focus, and state helpers
 */
const interactiveStyles =
  'transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'

const disabledStyles = 'disabled:pointer-events-none disabled:opacity-50'

const iconStyles =
  "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"

const invalidStyles =
  'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'

/**
 * Variant styles
 */
const defaultVariantStyles = twMerge(
  'bg-primary text-primary-foreground',
  'hover:bg-primary/90'
)

const destructiveVariantStyles = twMerge(
  'bg-destructive text-white dark:bg-destructive/60',
  'hover:bg-destructive/90',
  'focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40'
)

const outlineVariantStyles = twMerge(
  'border bg-background shadow-xs',
  'hover:bg-accent hover:text-accent-foreground',
  'dark:bg-input/30 dark:border-input dark:hover:bg-input/50'
)

const secondaryVariantStyles = twMerge(
  'bg-secondary text-secondary-foreground',
  'hover:bg-secondary/80'
)

const ghostVariantStyles = twMerge(
  'hover:bg-accent hover:text-accent-foreground',
  'dark:hover:bg-accent/50'
)

const linkVariantStyles = twMerge(
  'text-primary underline-offset-4',
  'hover:underline'
)

/**
 * Size styles
 */
const sizeDefaultStyles = 'h-9 px-4 py-2 has-[>svg]:px-3'
const sizeSmStyles = 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5'
const sizeLgStyles = 'h-10 rounded-md px-6 has-[>svg]:px-4'
const sizeIconStyles = 'size-9'
const sizeIconSmStyles = 'size-8'
const sizeIconLgStyles = 'size-10'

export const buttonVariants = cva(
  twMerge(
    baseStyles,
    interactiveStyles,
    disabledStyles,
    iconStyles,
    invalidStyles
  ),
  {
    variants: {
      variant: {
        default: defaultVariantStyles,
        destructive: destructiveVariantStyles,
        outline: outlineVariantStyles,
        secondary: secondaryVariantStyles,
        ghost: ghostVariantStyles,
        link: linkVariantStyles,
      },
      size: {
        default: sizeDefaultStyles,
        sm: sizeSmStyles,
        lg: sizeLgStyles,
        icon: sizeIconStyles,
        'icon-sm': sizeIconSmStyles,
        'icon-lg': sizeIconLgStyles,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
