import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '../../lib/utils'
import { Button } from '../Button'
import { Calendar } from '../Calendar'
import { Popover } from '../Popover'
import type { DatePickerProps } from './DatePicker.type'

export type { DatePickerProps } from './DatePicker.type'

export function DatePicker({ date, onDateChange, className }: DatePickerProps) {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-70 justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={onDateChange} />
      </Popover.Content>
    </Popover>
  )
}
