import { cn } from '../../lib/utils'
import { pageHeaderStyles } from './PageHeader.constants'
import type { PageHeaderProps } from './PageHeader.type'


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
