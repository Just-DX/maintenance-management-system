'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import { Input } from '../../shadcn-primitives/input'
import { Label } from '../../shadcn-primitives/label'
import { fieldStyles } from './Field.constants'

export interface FieldProps extends Omit<React.ComponentProps<'input'>, 'id'> {
  /** Field label text */
  label: string
  /** Optional description/helper text shown below the input */
  description?: string
  /** Error message to display (triggers error styling) */
  error?: string
  /** Whether the field is required */
  required?: boolean
  /** Custom class name for the root container */
  containerClassName?: string
}

export function Field({
  label,
  description,
  error,
  required,
  containerClassName,
  className,
  disabled,
  ...inputProps
}: FieldProps) {
  const id = React.useId()
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  const hasError = Boolean(error)
  const ariaDescribedBy =
    [description && descriptionId, hasError && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn(fieldStyles.root, containerClassName)} data-disabled={disabled}>
      <div className={fieldStyles.labelWrapper}>
        <Label htmlFor={id}>
          {label}
          {required && <span className={fieldStyles.required}>*</span>}
        </Label>
      </div>

      <Input
        id={id}
        className={className}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={ariaDescribedBy}
        {...inputProps}
      />

      {description && !hasError && (
        <p id={descriptionId} className={fieldStyles.description}>
          {description}
        </p>
      )}

      {hasError && (
        <p id={errorId} className={fieldStyles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

Field.displayName = 'Field'
