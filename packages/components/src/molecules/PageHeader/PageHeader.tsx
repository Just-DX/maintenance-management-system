import * as React from 'react'

import { cn } from '../../lib/utils'
import { pageHeaderStyles } from './PageHeader.constants'

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  actions?: React.ReactNode
  breadcrumb?: React.ReactNode
}

export function PageHeader({
  className,
  title,
  description,
  actions,
  breadcrumb,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn(pageHeaderStyles.root, className)} {...props}>
      {breadcrumb && <div className={pageHeaderStyles.breadcrumb}>{breadcrumb}</div>}
      <div className={pageHeaderStyles.header}>
        <div className={pageHeaderStyles.content}>
          <h1 className={pageHeaderStyles.title}>{title}</h1>
          {description && <p className={pageHeaderStyles.description}>{description}</p>}
        </div>
        {actions && <div className={pageHeaderStyles.actions}>{actions}</div>}
      </div>
    </div>
  )
}

PageHeader.displayName = 'PageHeader'
