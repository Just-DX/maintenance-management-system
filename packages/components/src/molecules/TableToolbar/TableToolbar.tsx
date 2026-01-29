import { cn } from '../../lib/utils'
import { InputSearch } from '../../atoms/InputGroup'
import { tableToolbarStyles } from './TableToolbar.constants'
import type { TableToolbarProps } from './TableToolbar.type'

export type { TableToolbarProps } from './TableToolbar.type'

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
