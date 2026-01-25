import { recordTableStyles } from '../../organisms/RecordTable/RecordTable.constants'
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
      <div className={recordTableStyles.tableWrapper}>
        <div className={recordTableStyles.skeleton.header}>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonPrimitive key={i} className={recordTableStyles.skeleton.headerCell} />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <div key={rowIndex} className={recordTableStyles.skeleton.row}>
            {Array.from({ length: 5 }).map((_, cellIndex) => (
              <SkeletonPrimitive key={cellIndex} className={recordTableStyles.skeleton.cell} />
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
