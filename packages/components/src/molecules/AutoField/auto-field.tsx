'use client'

import * as React from 'react'
import type { Control, FieldValues } from 'react-hook-form'

import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { DatePicker } from '../../atoms/DatePicker/DatePicker'
import { InputGroup } from '../../atoms/InputGroup/InputGroup'
import { MultiSelect } from '../../atoms/MultiSelect/MultiSelect'
import { RadioGroup } from '../../atoms/RadioGroup/RadioGroup'
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

    case 'input-group':
      return (
        <InputGroup
          {...field.props}
          disabled={field.disabled}
          value={(rhf.value as string) ?? ''}
          onChange={rhf.onChange}
          onBlur={rhf.onBlur}
          name={rhf.name}
          ref={rhf.ref as React.Ref<HTMLInputElement>}
        />
      )

    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            {...field.props}
            disabled={field.disabled}
            checked={!!rhf.value}
            onCheckedChange={rhf.onChange}
            name={rhf.name}
            ref={rhf.ref as React.Ref<HTMLButtonElement>}
            id={rhf.name}
          />
          {field.checkBoxLabel && (
            <label
              htmlFor={rhf.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {field.checkBoxLabel}
            </label>
          )}
        </div>
      )

    case 'radio-group':
      return (
        <RadioGroup
          {...field.props}
          disabled={field.disabled}
          value={(rhf.value as string) ?? ''}
          onValueChange={rhf.onChange}
          name={rhf.name}
          ref={rhf.ref as React.Ref<HTMLDivElement>}
          className={cn(field.orientation === 'horizontal' ? 'flex gap-4' : 'grid gap-2')}
        >
          {field.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroup.Item value={option.value} id={`${rhf.name}-${option.value}`} />
              <label
                htmlFor={`${rhf.name}-${option.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      )

    case 'date-picker':
      return (
        <DatePicker date={rhf.value as Date | undefined} setDate={(date) => rhf.onChange(date)} />
      )

    case 'multi-select':
      return (
        <MultiSelect
          {...field.props}
          disabled={field.disabled}
          options={field.options}
          value={(rhf.value as string[]) ?? []}
          onValueChange={rhf.onChange}
        />
      )

    default: {
      // TypeScript exhaustiveness check
      const _exhaustiveCheck: never = field
      return _exhaustiveCheck
    }
  }
}

AutoField.displayName = 'AutoField'
