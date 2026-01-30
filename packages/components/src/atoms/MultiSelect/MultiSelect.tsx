'use client'

import { Check, ChevronsUpDown, X } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../shadcn-primitives/command'
import { Badge } from '../Badge'
import { Button } from '../Button'
import { Popover } from '../Popover'
import type { MultiSelectProps } from './MultiSelect.type'

export function MultiSelect({
  options,
  value = [],
  onValueChange,
  placeholder = 'Select items...',
  emptyMessage = 'No items found.',
  searchPlaceholder = 'Search...',
  className,
  disabled = false,
  maxDisplayed = 3,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue]
    onValueChange?.(newValue)
  }

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onValueChange?.(value.filter((v) => v !== optionValue))
  }

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    onValueChange?.([])
  }

  const selectedLabels = value
    .map((v) => options.find((opt) => opt.value === v)?.label)
    .filter(Boolean) as string[]

  const displayedLabels = selectedLabels.slice(0, maxDisplayed)
  const remainingCount = selectedLabels.length - maxDisplayed

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'w-full min-h-10 h-auto justify-between px-3 py-2',
            value.length === 0 && 'text-muted-foreground',
            className
          )}
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {value.length === 0 ? (
              <span>{placeholder}</span>
            ) : (
              <>
                {displayedLabels.map((label) => {
                  const optionValue = options.find((opt) => opt.label === label)?.value
                  if (!optionValue) return null
                  return (
                    <Badge
                      key={optionValue}
                      variant="secondary"
                      className="px-2 py-0.5 text-xs font-normal"
                    >
                      {label}
                      <button
                        type="button"
                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-muted"
                        onClick={(e) => handleRemove(optionValue, e)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {label}</span>
                      </button>
                    </Badge>
                  )
                })}
                {remainingCount > 0 && (
                  <Badge variant="secondary" className="px-2 py-0.5 text-xs font-normal">
                    +{remainingCount} more
                  </Badge>
                )}
              </>
            )}
          </div>
          <div className="flex items-center gap-1 ml-2">
            {value.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="p-0.5 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4 opacity-50 hover:opacity-100" />
                <span className="sr-only">Clear all</span>
              </button>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </div>
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </Popover.Content>
    </Popover>
  )
}
