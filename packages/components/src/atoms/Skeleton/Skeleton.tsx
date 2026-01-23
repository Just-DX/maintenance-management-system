import { dataTableStyles } from '@organisms/DataTable/DataTable.constants'
import { Skeleton as SkeletonPrimitive } from '../../shadcn-primitives/skeleton'

const PageDetail = () => (
  <div className="flex flex-col gap-6">
    <div className="flex items-center justify-between">
      <SkeletonPrimitive className="w-48 h-8" />
      <SkeletonPrimitive className="w-32 h-10" />
    </div>
    <div className="space-y-4">
      <SkeletonPrimitive className="w-full h-4" />
      <SkeletonPrimitive className="w-full h-4" />
      <SkeletonPrimitive className="w-2/3 h-4" />
    </div>
  </div>
)

const Table = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <SkeletonPrimitive className="h-8 w-50" />
      <SkeletonPrimitive className="h-8 w-25" />
    </div>
    <div className="space-y-2">
      <div className={dataTableStyles.tableWrapper}>
        <div className={dataTableStyles.skeleton.header}>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonPrimitive key={i} className={dataTableStyles.skeleton.headerCell} />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <div key={rowIndex} className={dataTableStyles.skeleton.row}>
            {Array.from({ length: 5 }).map((_, cellIndex) => (
              <SkeletonPrimitive key={cellIndex} className={dataTableStyles.skeleton.cell} />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
)

export const Skeleton = Object.assign(SkeletonPrimitive, {
  PageDetail,
  Table,
})
