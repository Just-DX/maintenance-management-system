import { Button } from '@justdx/components'
import { Check, UserPlus } from 'lucide-react'

interface WorkOrderQuickActionsProps {
  onAssign?: () => void
  onComplete?: () => void
}

export function WorkOrderQuickActions({ onAssign, onComplete }: WorkOrderQuickActionsProps) {
  return (
    <div className="flex items-center gap-1 row-quick-actions">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
        title="Assign Technician"
        onClick={(e) => {
          e.stopPropagation()
          onAssign?.()
        }}
      >
        <UserPlus className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-success hover:bg-success/10"
        title="Mark Complete"
        onClick={(e) => {
          e.stopPropagation()
          onComplete?.()
        }}
      >
        <Check className="h-4 w-4" />
      </Button>
    </div>
  )
}
