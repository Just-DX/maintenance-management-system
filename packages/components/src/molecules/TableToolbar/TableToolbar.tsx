import * as React from 'react'

import { cn } from '../../lib/utils'
import { InputSearch } from '../../atoms/InputGroup'
import { tableToolbarStyles } from './TableToolbar.constants'

export interface TableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  showSearch?: boolean
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export function TableToolbar({
  className,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  showSearch = true,
  filters,
  actions,
  ...props
}: TableToolbarProps) {
  return (
    <div className={cn(tableToolbarStyles.root, className)} {...props}>
      <div className={tableToolbarStyles.left}>
        {showSearch && (
          <InputSearch
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className={tableToolbarStyles.search}
            aria-label="Search table"
          />
        )}
        {filters && <div className={tableToolbarStyles.filters}>{filters}</div>}
      </div>
      {actions && <div className={tableToolbarStyles.right}>{actions}</div>}
    </div>
  )
}

TableToolbar.displayName = 'TableToolbar'
