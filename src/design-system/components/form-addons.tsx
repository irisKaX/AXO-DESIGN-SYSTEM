import { useId, useState } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { CalendarIcon } from 'lucide-react'
import { Input } from './input'
import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Field, FieldLabel, FieldDescription, FieldError } from './field'

export function NumberInput({ onValueChange, onChange, ...props }: Omit<ComponentProps<typeof Input>, 'type'> & {
  onValueChange?: (value: number | undefined) => void
}) {
  return <Input {...props} type="number" inputMode="decimal" onChange={event => {
    onChange?.(event)
    onValueChange?.(Number.isNaN(event.currentTarget.valueAsNumber) ? undefined : event.currentTarget.valueAsNumber)
  }} />
}

export function FileUpload({ onFilesChange, onChange, ...props }: Omit<ComponentProps<typeof Input>, 'type' | 'value' | 'defaultValue'> & {
  onFilesChange?: (files: File[]) => void
}) {
  return <Input {...props} type="file" onChange={event => {
    onChange?.(event)
    onFilesChange?.(Array.from(event.currentTarget.files ?? []))
  }} />
}

export interface FieldControlProps {
  id: string
  required?: boolean
  'aria-invalid'?: boolean
  'aria-describedby'?: string
  'data-status'?: 'success'
}

export function FormField({ label, description, error, success, required, children, id: suppliedId }: {
  label: string
  description?: string
  error?: string
  success?: string
  required?: boolean
  id?: string
  children: (props: FieldControlProps) => ReactNode
}) {
  const generatedId = useId()
  const id = suppliedId ?? generatedId
  const message = error || success || description
  return <Field data-invalid={!!error}>
    <FieldLabel htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</FieldLabel>
    {children({ id, required, 'aria-invalid': !!error, 'aria-describedby': message ? `${id}-message` : undefined, 'data-status': success && !error ? 'success' : undefined })}
    {error ? <FieldError id={`${id}-message`} role="alert">{error}</FieldError> : message ? <FieldDescription id={`${id}-message`} style={success ? { color: 'var(--axo-state-success-color)' } : undefined}>{message}</FieldDescription> : null}
  </Field>
}

export interface DatePickerProps {
  value?: Date
  defaultValue?: Date
  onValueChange?: (value: Date | undefined) => void
  disabled?: boolean
  readOnly?: boolean
  id?: string
  'aria-label'?: string
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

/** Reusable composition of the official Popover, Calendar and Button. */
export function DatePicker(allProps: DatePickerProps) {
  const { value, defaultValue, onValueChange, disabled, readOnly, ...props } = allProps
  const controlled = Object.prototype.hasOwnProperty.call(allProps, 'value')
  const [internalDate, setInternalDate] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const selected = controlled ? value : internalDate
  return <Popover open={open} onOpenChange={next => { if (!readOnly) setOpen(next) }}>
    <PopoverTrigger asChild><Button type="button" variant="outline" disabled={disabled} aria-disabled={readOnly || disabled} {...props}>
      <CalendarIcon aria-hidden="true" />{selected ? selected.toLocaleDateString('cs-CZ') : 'Vybrat datum'}
    </Button></PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start" aria-label={`${props['aria-label'] ?? 'Datum'} — výběr data`}><Calendar mode="single" selected={selected} onSelect={date => {
      if (disabled || readOnly) return
      if (!controlled) setInternalDate(date)
      onValueChange?.(date); setOpen(false)
    }} /></PopoverContent>
  </Popover>
}
