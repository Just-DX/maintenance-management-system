import * as React from 'react'
import { Skeleton } from '../../atoms/Skeleton'
import type { RecordTableSkeletonProps } from './RecordTableSkeleton.type'

const tableStyles = {
  wrapper: 'p-8',
  header: 'flex gap-4 mb-4',
  headerCell: 'h-8 flex-1',
  row: 'flex gap-4 mb-3',
  cell: 'h-12 flex-1',
}

export const RecordTableSkeleton = React.memo<RecordTableSkeletonProps>(({ columns, rows = 5 }) => {
  return (
    <div className={tableStyles.wrapper}>
      <div className={tableStyles.header}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className={tableStyles.headerCell} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className={tableStyles.row}>
          {Array.from({ length: columns }).map((_, cellIndex) => (
            <Skeleton key={cellIndex} className={tableStyles.cell} />
          ))}
        </div>
      ))}
    </div>
  )
})

RecordTableSkeleton.displayName = 'RecordTableSkeleton'
