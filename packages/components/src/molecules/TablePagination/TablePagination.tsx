import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from '../../atoms/Button'
import { Select } from '../../atoms/Select'
import { cn } from '../../lib/utils'
import { defaultPageSizeOptions, tablePaginationStyles } from './TablePagination.constants'
import type { TablePaginationProps } from './TablePagination.type'

export type { TablePaginationProps } from './TablePagination.type'

export function TablePagination({
  className,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = defaultPageSizeOptions,
  showPageSize = true,
  showInfo = true,
  ...props
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1
  const endItem = Math.min(page * pageSize, total)

  const canGoPrevious = page > 1
  const canGoNext = page < totalPages

  const goToPage = (newPage: number) => {
    const clampedPage = Math.max(1, Math.min(newPage, totalPages))
    if (clampedPage !== page) {
      onPageChange(clampedPage)
    }
  }

  // Generate page numbers with ellipsis
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = []
    const showPages = 5 // Max visible page buttons

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (page > 3) {
        pages.push('ellipsis')
      }

      // Show pages around current
      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (page < totalPages - 2) {
        pages.push('ellipsis')
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (total === 0) {
    return null
  }

  return (
    <div className={cn(tablePaginationStyles.root, className)} {...props}>
      {showInfo && (
        <div className={tablePaginationStyles.info}>
          Showing {startItem} to {endItem} of {total} items
        </div>
      )}

      <div className={tablePaginationStyles.controls}>
        {showPageSize && onPageSizeChange && (
          <div className={tablePaginationStyles.pageSize}>
            <span className={tablePaginationStyles.pageSizeLabel}>Rows per page</span>
            <Select
              defaultValue={String(pageSize)}
              value={String(pageSize)}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <Select.Trigger className={tablePaginationStyles.pageSizeSelect}>
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                {pageSizeOptions.map((size) => (
                  <Select.Item key={size} value={String(size)}>
                    {size}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
        )}

        <nav className={tablePaginationStyles.navigation} role="navigation" aria-label="Pagination">
          {/* First page */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(1)}
            disabled={!canGoPrevious}
            aria-label="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Previous page */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(page - 1)}
            disabled={!canGoPrevious}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page numbers */}
          <div className="hidden sm:flex items-center gap-1">
            {getPageNumbers().map((pageNum, index) =>
              pageNum === 'ellipsis' ? (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-9 w-9 items-center justify-center text-muted-foreground"
                  aria-hidden
                >
                  ...
                </span>
              ) : (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => goToPage(pageNum)}
                  aria-label={`Go to page ${pageNum}`}
                  aria-current={pageNum === page ? 'page' : undefined}
                >
                  {pageNum}
                </Button>
              )
            )}
          </div>

          {/* Mobile page indicator */}
          <span className="sm:hidden text-sm text-muted-foreground px-2">
            {page} / {totalPages}
          </span>

          {/* Next page */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(page + 1)}
            disabled={!canGoNext}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last page */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(totalPages)}
            disabled={!canGoNext}
            aria-label="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    </div>
  )
}

TablePagination.displayName = 'TablePagination'
