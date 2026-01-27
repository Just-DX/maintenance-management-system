import { cn } from '@justdx/components'
import { format, formatDistanceToNow } from 'date-fns'

export function WorkOrderDueDateCell({
  date,
  isCompleted,
}: {
  date: string
  isCompleted: boolean
}) {
  const dateObj = new Date(date)
  const isOverdue = !isCompleted && dateObj < new Date()
  const isDueSoon = !isCompleted && !isOverdue && dateObj.getTime() - Date.now() < 86400000 * 2

  return (
    <div
      className={cn('flex flex-col text-sm', {
        'text-warning font-medium': isOverdue,
        'text-destructive font-medium': isDueSoon,
        'text-muted-foreground': !isOverdue && !isDueSoon,
      })}
    >
      <span>{format(dateObj, 'MMM d, yyyy')}</span>
      <span className="text-[10px] opacity-80">
        {isCompleted ? 'Done' : formatDistanceToNow(dateObj, { addSuffix: true })}
      </span>
    </div>
  )
}
