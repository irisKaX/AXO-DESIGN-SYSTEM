import { useId } from 'react'
import type { ReactNode } from 'react'
import { Checkbox, Label, NativeSelect, NativeSelectOption } from '../../design-system'
import type { ComponentDocumentation, BooleanControl } from '../docs/types'
import type { DemoOptions } from '../examples/types'
import styles from '../Catalog.module.css'

const labels: Record<BooleanControl, string> = { disabled: 'Disabled', loading: 'Loading', invalid: 'Error / Invalid', success: 'Success', readOnly: 'Read Only', empty: 'Empty', selected: 'Selected' }
export function DemoControls({ doc, options, onChange, children }: { doc: ComponentDocumentation; options: DemoOptions; onChange: (options: DemoOptions) => void; children?: ReactNode }) {
  const id = useId()
  return <div className={styles.controls}>
    {doc.variants.length > 1 && <Label>Varianta<NativeSelect aria-label={`Varianta: ${doc.name}`} value={options.variant} onChange={event => onChange({ ...options, variant: event.target.value })}>{doc.variants.map(value => <NativeSelectOption key={value}>{value}</NativeSelectOption>)}</NativeSelect></Label>}
    {doc.sizes.length > 1 && <Label>Velikost<NativeSelect aria-label={`Velikost: ${doc.name}`} value={options.size} onChange={event => onChange({ ...options, size: event.target.value })}>{doc.sizes.map(value => <NativeSelectOption key={value}>{value}</NativeSelectOption>)}</NativeSelect></Label>}
    {children}
    {doc.controls.map(control => <Label key={control} htmlFor={`${id}-${control}`}><Checkbox id={`${id}-${control}`} checked={options[control]} onCheckedChange={checked => onChange({ ...options, [control]: !!checked })} />{labels[control]}</Label>)}
  </div>
}
