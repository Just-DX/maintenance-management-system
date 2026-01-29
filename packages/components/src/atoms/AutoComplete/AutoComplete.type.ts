export interface AutoCompleteProps {
  options: {
    value: string
    label: string
  }[]
  value?: string
  onSetValue?: (value: string) => void
  placeholder?: string
  emptyMessage?: string
  className?: string
}
