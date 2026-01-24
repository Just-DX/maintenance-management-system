'use client'

import * as React from 'react'
import type { Control, FieldValues } from 'react-hook-form'

import { cn } from '../../lib/utils'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../shadcn-primitives/form'
import { Input } from '../../shadcn-primitives/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../shadcn-primitives/select'
import { Switch } from '../../shadcn-primitives/switch'
import { Textarea } from '../../shadcn-primitives/textarea'

import type { FieldConfig } from './field-config'

export interface AutoFieldProps<TValues extends FieldValues> {
  /** react-hook-form control object */
  control: Control<TValues>
  /** Field configuration with discriminated type */
  field: FieldConfig<TValues>
}

/**
 * Config-driven form field component.
 * Renders the appropriate shadcn control based on field.type.
 */
export function AutoField<TValues extends FieldValues>({
  control,
  field,
}: AutoFieldProps<TValues>) {
  return (
    <FormField
      control={control}
      name={field.name}
      rules={field.rules}
      render={({ field: rhf }) => (
        <FormItem className={cn(field.className)}>
          {field.label && (
            <FormLabel>
              {field.label}
              {field.rules?.required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>{renderControl(field, rhf)}</FormControl>
          {field.description && <FormDescription>{field.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/**
 * Renders the appropriate control based on field type.
 * Uses discriminated union to ensure type safety.
 */
function renderControl<TValues extends FieldValues>(
  field: FieldConfig<TValues>,
  rhf: {
    value: unknown
    onChange: (...event: unknown[]) => void
    onBlur: () => void
    name: string
    ref: React.Ref<unknown>
  }
): React.ReactElement {
  switch (field.type) {
    case 'input':
      return (
        <Input
          {...field.props}
          disabled={field.disabled}
          value={(rhf.value as string) ?? ''}
          onChange={rhf.onChange}
          onBlur={rhf.onBlur}
          name={rhf.name}
          ref={rhf.ref as React.Ref<HTMLInputElement>}
        />
      )

    case 'textarea':
      return (
        <Textarea
          {...field.props}
          disabled={field.disabled}
          value={(rhf.value as string) ?? ''}
          onChange={rhf.onChange}
          onBlur={rhf.onBlur}
          name={rhf.name}
          ref={rhf.ref as React.Ref<HTMLTextAreaElement>}
        />
      )

    case 'switch':
      return (
        <Switch
          {...field.props}
          disabled={field.disabled}
          checked={!!rhf.value}
          onCheckedChange={rhf.onChange}
          name={rhf.name}
          ref={rhf.ref as React.Ref<HTMLButtonElement>}
        />
      )

    case 'select':
      return (
        <Select
          disabled={field.disabled}
          value={(rhf.value as string) ?? ''}
          onValueChange={rhf.onChange}
          name={rhf.name}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={field.props?.placeholder ?? 'Select an option'} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    default: {
      // TypeScript exhaustiveness check
      const _exhaustiveCheck: never = field
      return _exhaustiveCheck
    }
  }
}

AutoField.displayName = 'AutoField'
