import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'
import { pageLayoutStyles, pageLayoutVariants } from './PageLayout.constants'

export interface PageLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pageLayoutVariants> {
  header?: React.ReactNode
}

export function PageLayout({
  className,
  variant,
  maxWidth,
  padding,
  header,
  children,
  ...props
}: PageLayoutProps) {
  return (
    <div className={cn(pageLayoutVariants({ variant, maxWidth, padding }), className)} {...props}>
      {header && <div className={pageLayoutStyles.header}>{header}</div>}
      <div className={pageLayoutStyles.content}>{children}</div>
    </div>
  )
}

PageLayout.displayName = 'PageLayout'
