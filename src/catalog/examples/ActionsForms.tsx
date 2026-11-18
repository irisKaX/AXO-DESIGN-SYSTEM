import { useEffect, useId, useState } from 'react'
import type { ComponentProps } from 'react'
import { Search, Settings } from 'lucide-react'
import { Button, IconButton, ButtonGroup, CopyButton, LoadingButton, Input, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, NativeSelect, NativeSelectOption, Checkbox, RadioGroup, RadioGroupItem, Switch, Slider, NumberInput, DatePicker, Calendar, FileUpload, InputGroup, InputGroupAddon, InputGroupInput, FormField, Label, Stack } from '../../design-system'
import type { DateRange } from '../../design-system'
import type { DemoProps } from './types'

export function ButtonDemo({ options: o }: DemoProps) {
  const [count, setCount] = useState(0)
  const iconOnly = o.size === 'icon' || o.size.startsWith('icon-')
  return <Stack><Button type="button" variant={o.variant as ComponentProps<typeof Button>['variant']} size={o.size as ComponentProps<typeof Button>['size']} aria-label={iconOnly ? 'Provést akci' : undefined} disabled={o.disabled} onClick={() => setCount(count + 1)}>{iconOnly ? <Settings aria-hidden="true" /> : 'Provést akci'}</Button><output aria-live="polite">Provedeno: {count}×</output></Stack>
}
export function IconButtonDemo({ options: o }: DemoProps) {
  const [active, setActive] = useState(o.selected)
  return <IconButton label="Přepnout nastavení" icon={<Settings aria-hidden="true" />} size={o.size as 'default' | 'sm' | 'lg' | 'xs'} variant={o.variant as ComponentProps<typeof Button>['variant']} disabled={o.disabled} aria-pressed={active} onClick={() => setActive(!active)} />
}
export function ButtonGroupDemo({ options: o }: DemoProps) {
  const [selected, setSelected] = useState('Měsíc')
  return <ButtonGroup orientation={o.variant === 'vertical' ? 'vertical' : 'horizontal'} aria-label="Období">{['Den', 'Týden', 'Měsíc'].map(value => <Button type="button" key={value} variant={selected === value ? 'default' : 'outline'} disabled={o.disabled} aria-pressed={selected === value} onClick={() => setSelected(value)}>{value}</Button>)}</ButtonGroup>
}
export function CopyButtonDemo({ options: o }: DemoProps) { return <CopyButton value="AXO Design System" disabled={o.disabled} variant={o.variant as ComponentProps<typeof Button>['variant']} size={o.size as ComponentProps<typeof Button>['size']} /> }
export function LoadingButtonDemo({ options: o }: DemoProps) {
  const [busy, setBusy] = useState(false)
  useEffect(() => { if (!busy) return; const timer = setTimeout(() => setBusy(false), 1000); return () => clearTimeout(timer) }, [busy])
  return <LoadingButton variant={o.variant as ComponentProps<typeof Button>['variant']} size={o.size as ComponentProps<typeof Button>['size']} disabled={o.disabled} loading={o.loading || busy} onClick={() => setBusy(true)}>Uložit změny</LoadingButton>
}
export function InputDemo({ options: o }: DemoProps) {
  const id = useId()
  return <Stack gap={2}><Label htmlFor={id}>Jméno</Label><Input id={id} placeholder="Zadejte jméno" defaultValue={o.empty ? '' : 'Alex'} disabled={o.disabled} readOnly={o.readOnly} aria-invalid={o.invalid} data-status={o.success && !o.invalid ? 'success' : undefined} /></Stack>
}
export function TextareaDemo({ options: o }: DemoProps) {
  const id = useId()
  return <Stack gap={2}><Label htmlFor={id}>Poznámka</Label><Textarea id={id} placeholder="Vaše poznámka" defaultValue={o.empty ? '' : 'Pracovní poznámka k návrhu.'} disabled={o.disabled} readOnly={o.readOnly} aria-invalid={o.invalid} data-status={o.success && !o.invalid ? 'success' : undefined} /></Stack>
}
export function SelectDemo({ options: o }: DemoProps) {
  const [value, setValue] = useState(o.empty ? '' : 'design')
  return <Stack gap={2}><Label>Oddělení</Label><Select value={value} onValueChange={setValue} disabled={o.disabled}><SelectTrigger aria-label="Oddělení" aria-invalid={o.invalid} size={o.size as 'default' | 'sm'}><SelectValue placeholder="Vyberte oddělení" /></SelectTrigger><SelectContent><SelectItem value="design">Design</SelectItem><SelectItem value="engineering">Engineering</SelectItem><SelectItem value="archived" disabled>Archivované</SelectItem></SelectContent></Select><output className="text-sm" aria-live="polite">Vybráno: {value || 'nic'}</output></Stack>
}
export function NativeSelectDemo({ options: o }: DemoProps) {
  const id = useId()
  return <Stack gap={2}><Label htmlFor={id}>Jazyk</Label><NativeSelect id={id} disabled={o.disabled} aria-invalid={o.invalid} size={o.size as 'default' | 'sm'} defaultValue={o.empty ? '' : 'cs'}><NativeSelectOption value="">Vyberte jazyk</NativeSelectOption><NativeSelectOption value="cs">Čeština</NativeSelectOption><NativeSelectOption value="en">English</NativeSelectOption></NativeSelect></Stack>
}
export function CheckboxDemo({ options: o }: DemoProps) {
  const id = useId()
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(o.variant === 'indeterminate' ? 'indeterminate' : o.selected)
  return <div className="flex items-center gap-2"><Checkbox id={id} disabled={o.disabled} aria-invalid={o.invalid} checked={checked} onCheckedChange={setChecked} /><Label htmlFor={id}>Souhlasím s podmínkami</Label></div>
}
export function RadioGroupDemo({ options: o }: DemoProps) {
  const id = useId()
  return <RadioGroup orientation={o.variant === 'horizontal' ? 'horizontal' : 'vertical'} defaultValue={o.selected ? 'team' : 'personal'} disabled={o.disabled} aria-label="Typ účtu" className={o.variant === 'horizontal' ? 'flex flex-wrap gap-4' : undefined}>{[['personal', 'Osobní'], ['team', 'Týmový']].map(([value, text]) => <div key={value} className="flex items-center gap-2"><RadioGroupItem value={value} id={`${id}-${value}`} /><Label htmlFor={`${id}-${value}`}>{text}</Label></div>)}</RadioGroup>
}
export function SwitchDemo({ options: o }: DemoProps) {
  const id = useId(); return <div className="flex items-center gap-2"><Switch id={id} defaultChecked={o.selected} disabled={o.disabled} /><Label htmlFor={id}>E-mailová oznámení</Label></div>
}
export function SliderDemo({ options: o }: DemoProps) {
  const [value, setValue] = useState(o.variant === 'range' ? [25, 75] : [50])
  return <Stack><Slider orientation={o.variant === 'vertical' ? 'vertical' : 'horizontal'} aria-label="Rozsah hodnot" defaultValue={value} onValueChange={setValue} disabled={o.disabled} max={100} step={5} /><output aria-live="polite">Hodnota: {value.join(' – ')}</output></Stack>
}
export function NumberInputDemo({ options: o }: DemoProps) {
  const id = useId(); return <Stack gap={2}><Label htmlFor={id}>Počet míst (1–10)</Label><NumberInput id={id} defaultValue={o.empty ? '' : 3} min={1} max={10} step={1} disabled={o.disabled} readOnly={o.readOnly} aria-invalid={o.invalid} /></Stack>
}
export function DatePickerDemo({ options: o }: DemoProps) { return <DatePicker aria-label="Datum schůzky" disabled={o.disabled} readOnly={o.readOnly} aria-invalid={o.invalid} defaultValue={o.empty ? undefined : new Date(2026, 10, 17)} /> }
export function CalendarDemo({ options: o }: DemoProps) {
  const [date, setDate] = useState<Date | undefined>(o.selected ? new Date(2026, 10, 17) : undefined)
  const [dates, setDates] = useState<Date[] | undefined>(o.selected ? [new Date(2026, 10, 17)] : [])
  const [range, setRange] = useState<DateRange | undefined>(o.selected ? { from: new Date(2026, 10, 17), to: new Date(2026, 10, 20) } : undefined)
  if (o.variant === 'multiple') return <Calendar mode="multiple" defaultMonth={new Date(2026, 10, 1)} selected={dates} onSelect={setDates} disabled={o.disabled} />
  if (o.variant === 'range') return <Calendar mode="range" defaultMonth={new Date(2026, 10, 1)} selected={range} onSelect={setRange} disabled={o.disabled} />
  return <Calendar mode="single" defaultMonth={new Date(2026, 10, 1)} selected={date} onSelect={setDate} disabled={o.disabled} captionLayout={o.variant === 'dropdown' ? 'dropdown' : 'label'} />
}
export function FileUploadDemo({ options: o }: DemoProps) {
  const [files, setFiles] = useState<File[]>([]); const id = useId()
  return <Stack gap={2}><Label htmlFor={id}>Přílohy</Label><FileUpload id={id} multiple={o.variant === 'multiple'} accept="image/*,.pdf,.txt" disabled={o.disabled} aria-invalid={o.invalid} onFilesChange={setFiles} /><p role="status">{files.length ? files.map(file => file.name).join(', ') : 'Zatím nebyl vybrán soubor. Soubory se nikam neodesílají.'}</p></Stack>
}
export function InputGroupDemo({ options: o }: DemoProps) {
  return <InputGroup><InputGroupAddon><Search aria-hidden="true" /></InputGroupAddon><InputGroupInput aria-label="Hledat v katalogu" placeholder="Hledat…" disabled={o.disabled} readOnly={o.readOnly} aria-invalid={o.invalid} /></InputGroup>
}
export function FormFieldDemo({ options: o }: DemoProps) {
  return <FormField label="E-mail" description="Použijte pracovní adresu." error={o.invalid ? 'Zadejte platný e-mail.' : undefined} success={o.success ? 'Adresa je v pořádku.' : undefined} required>{props => <Input {...props} type="email" defaultValue={o.empty ? '' : 'alex@example.com'} disabled={o.disabled} readOnly={o.readOnly} />}</FormField>
}
export function LabelDemo() { const id = useId(); return <Stack gap={2}><Label htmlFor={id}>Přístupný popisek</Label><Input id={id} placeholder="Klikněte na popisek" /></Stack> }
export function ValidationDemo() {
  const [value, setValue] = useState(''); const [submitted, setSubmitted] = useState(false)
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  return <form className="space-y-4" noValidate onSubmit={event => { event.preventDefault(); setSubmitted(true) }}>
    <FormField label="E-mail" error={submitted && !valid ? 'Zadejte platnou e-mailovou adresu.' : undefined} success={submitted && valid ? 'Ověření proběhlo úspěšně.' : undefined} required>{props => <Input {...props} type="email" value={value} onChange={event => { setValue(event.target.value); setSubmitted(false) }} />}</FormField>
    <Button type="submit">Ověřit formulář</Button>
  </form>
}
