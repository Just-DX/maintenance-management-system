import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '../../lib/utils'
import { Button } from '../Button'
import { Popover } from '../Popover'
import type { AutoCompleteProps } from './AutoComplete.type'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../shadcn-primitives/command'

export type { AutoCompleteProps } from './AutoComplete.type'

export function AutoComplete({
  options,
  value,
  onSetValue,
  placeholder = 'Select item...',
  emptyMessage = 'No item found.',
  className,
}: AutoCompleteProps) {
  const [open, setOpen] = React.useState(false)

  // Manage internal state if uncontrolled, but prefer controlled via props
  const [internalValue, setInternalValue] = React.useState(value || '')

  const currentValue = value !== undefined ? value : internalValue

  const handleSelect = (currentValueString: string) => {
    const newValue = currentValueString === currentValue ? '' : currentValueString
    if (onSetValue) {
      onSetValue(newValue)
    } else {
      setInternalValue(newValue)
    }
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-[200px] justify-between', className)}
        >
          {currentValue
            ? options.find((option) => option.value === currentValue)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} value={option.value} onSelect={handleSelect}>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      currentValue === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </Popover.Content>
    </Popover>
  )
}
