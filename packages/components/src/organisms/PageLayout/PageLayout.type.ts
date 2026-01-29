import type { HTMLAttributes, ReactNode } from 'react'
import type { VariantProps } from 'class-variance-authority'

import type { pageLayoutVariants } from './PageLayout.constants'

export interface PageLayoutProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageLayoutVariants> {
  header?: ReactNode
}
