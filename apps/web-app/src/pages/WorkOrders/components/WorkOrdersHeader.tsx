import { workOrdersCopy } from '../constants/copy'

export function WorkOrdersHeader() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{workOrdersCopy.title}</h2>
        <p className="text-muted-foreground">{workOrdersCopy.description}</p>
      </div>
    </div>
  )
}
