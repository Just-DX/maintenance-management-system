import { cn } from '../../lib/utils'
import { pageLayoutStyles, pageLayoutVariants } from './PageLayout.constants'
import type { PageLayoutProps } from './PageLayout.type'

export type { PageLayoutProps } from './PageLayout.type'

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
    <div
      className={cn(pageLayoutVariants({ variant, maxWidth, padding }), className, 'my-6')}
      {...props}
    >
      {header && <div className={pageLayoutStyles.header}>{header}</div>}
      <div className={pageLayoutStyles.content}>{children}</div>
    </div>
  )
}

PageLayout.displayName = 'PageLayout'
