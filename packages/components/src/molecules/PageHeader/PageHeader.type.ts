import type { HTMLAttributes, ReactNode } from 'react'

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  actions?: ReactNode
  breadcrumb?: ReactNode
}
