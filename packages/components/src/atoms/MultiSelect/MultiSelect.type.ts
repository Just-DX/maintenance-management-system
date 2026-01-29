export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  /** Available options to select from */
  options: MultiSelectOption[]
  /** Currently selected values */
  value?: string[]
  /** Callback when selection changes */
  onValueChange?: (value: string[]) => void
  /** Placeholder text when no items selected */
  placeholder?: string
  /** Message shown when search yields no results */
  emptyMessage?: string
  /** Search input placeholder */
  searchPlaceholder?: string
  /** Additional className for the trigger button */
  className?: string
  /** Whether the component is disabled */
  disabled?: boolean
  /** Maximum number of badges to show before truncating */
  maxDisplayed?: number
}
