import { useEffect, useId, useState } from 'react'
import { Button, LoadingButton, FormField, Input, Textarea, Checkbox, Label, Switch, Stack, Grid, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Alert, AlertTitle, AlertDescription, NativeSelect, NativeSelectOption, toast } from '../../design-system'
import { defaultDemoOptions } from '../examples/types'
import { ValidationDemo } from '../examples/ActionsForms'
import { DataTableDemo, EmptyDemo, LoadingStateDemo } from '../examples/DisplayFeedback'
import { AlertDialogDemo } from '../examples/OverlaysLayout'
import { BreadcrumbDemo, SidebarDemo, TabsDemo } from '../examples/Navigation'

export function LoginPattern() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const id = useId()
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  useEffect(() => { if (!busy) return; const timer = setTimeout(() => { setBusy(false); setDone(true); toast.success('Ukázkové přihlášení proběhlo.') }, 800); return () => clearTimeout(timer) }, [busy])
  return <form noValidate className="max-w-md space-y-4" onSubmit={event => { event.preventDefault(); setSubmitted(true); setDone(false); if (emailValid && password.length >= 8) setBusy(true) }}>
    <FormField label="E-mail" required error={submitted && !emailValid ? 'Zadejte platnou e-mailovou adresu.' : undefined}>{props => <Input {...props} type="email" autoComplete="username" value={email} onChange={event => { setEmail(event.target.value); setDone(false) }} disabled={busy} />}</FormField>
    <FormField label="Heslo" required description="V ukázce stačí libovolných 8 znaků. Nepoužívejte skutečné heslo." error={submitted && password.length < 8 ? 'Heslo musí mít alespoň 8 znaků.' : undefined}>{props => <Input {...props} type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} disabled={busy} />}</FormField>
    <div className="flex items-center gap-2"><Checkbox id={id} /><Label htmlFor={id}>Zapamatovat pro tuto ukázku</Label></div>
    <LoadingButton type="submit" loading={busy}>Přihlásit se</LoadingButton>
    <p role="status">{done ? `Přihlášen demonstrační účet ${email}.` : 'Lokální demonstrace; žádné údaje se neodesílají.'}</p>
  </form>
}

export function ProfilePattern() {
  const [name, setName] = useState('Alex Novák')
  const [bio, setBio] = useState('Produktový designér')
  const [notifications, setNotifications] = useState(true)
  const [saved, setSaved] = useState('')
  const id = useId()
  return <form className="max-w-lg space-y-4" onSubmit={event => { event.preventDefault(); setSaved(`${name}: ${bio}. Oznámení ${notifications ? 'zapnuta' : 'vypnuta'}.`); toast.success('Profil uložen pro tuto ukázku.') }}>
    <FormField label="Jméno" required>{props => <Input {...props} autoComplete="name" value={name} onChange={event => setName(event.target.value)} />}</FormField>
    <FormField label="O mně">{props => <Textarea {...props} value={bio} onChange={event => setBio(event.target.value)} />}</FormField>
    <div className="flex items-center gap-2"><Switch id={id} checked={notifications} onCheckedChange={setNotifications} /><Label htmlFor={id}>E-mailová oznámení</Label></div>
    <Button type="submit">Uložit profil</Button><p role="status">{saved || 'Změny se ukládají pouze do stavu této ukázky.'}</p>
  </form>
}

export function SearchPattern() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const items = [{ name: 'Design System', status: 'ready' }, { name: 'Dokumentace', status: 'progress' }, { name: 'Playground', status: 'ready' }]
  const filtered = items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()) && (status === 'all' || item.status === status))
  return <Stack><div className="flex flex-wrap gap-3"><Input aria-label="Hledat projekt" placeholder="Hledat projekt…" value={query} onChange={event => setQuery(event.target.value)} className="max-w-sm" /><NativeSelect aria-label="Filtrovat podle stavu" value={status} onChange={event => setStatus(event.target.value)}><NativeSelectOption value="all">Všechny stavy</NativeSelectOption><NativeSelectOption value="ready">Připraveno</NativeSelectOption><NativeSelectOption value="progress">Rozpracováno</NativeSelectOption></NativeSelect><Button type="button" variant="outline" onClick={() => { setQuery(''); setStatus('all') }}>Vymazat filtry</Button></div><p role="status">Nalezeno: {filtered.length}</p><Grid>{filtered.map(item => <Card key={item.name}><CardHeader><CardTitle>{item.name}</CardTitle><CardDescription>{item.status === 'ready' ? 'Připraveno' : 'Rozpracováno'}</CardDescription></CardHeader></Card>)}</Grid>{!filtered.length && <p>Žádné výsledky. Upravte hledání nebo vymažte filtry.</p>}</Stack>
}

export function DashboardPattern() {
  const [period, setPeriod] = useState('week')
  const multiplier = period === 'week' ? 1 : 4
  return <Stack><NativeSelect aria-label="Období dashboardu" value={period} onChange={event => setPeriod(event.target.value)}><NativeSelectOption value="week">Týden</NativeSelectOption><NativeSelectOption value="month">Měsíc</NativeSelectOption></NativeSelect><Grid>{[['Projekty', 3], ['Dokončené úkoly', 12], ['Připomínky', 7]].map(([label, value]) => <Card key={label}><CardHeader><CardTitle>{label}</CardTitle><CardDescription>Ukázková data za zvolené období</CardDescription></CardHeader><CardContent><strong className="text-3xl">{Number(value) * multiplier}</strong></CardContent><CardFooter><Button type="button" variant="outline" onClick={() => toast.info(`Detail: ${label}`)}>Zobrazit detail</Button></CardFooter></Card>)}</Grid></Stack>
}

export function EmptyErrorPattern() {
  const [state, setState] = useState('empty')
  useEffect(() => { if (state !== 'loading') return; const timer = setTimeout(() => setState('filled'), 800); return () => clearTimeout(timer) }, [state])
  return <Stack><NativeSelect aria-label="Stav obsahu" value={state} onChange={event => setState(event.target.value)}><NativeSelectOption value="empty">Prázdný</NativeSelectOption><NativeSelectOption value="error">Chyba</NativeSelectOption><NativeSelectOption value="loading">Načítání</NativeSelectOption><NativeSelectOption value="filled">Naplněný</NativeSelectOption></NativeSelect>{state === 'empty' ? <EmptyDemo /> : state === 'error' ? <Alert variant="destructive"><AlertTitle>Obsah se nepodařilo načíst</AlertTitle><AlertDescription>Ukázková chyba připojení.</AlertDescription><Button type="button" variant="outline" onClick={() => setState('loading')}>Zkusit znovu</Button></Alert> : state === 'loading' ? <LoadingStateDemo options={{ ...defaultDemoOptions, loading: true }} /> : <Alert><AlertTitle>Obsah načten</AlertTitle><AlertDescription>Opakování operace proběhlo úspěšně.</AlertDescription></Alert>}</Stack>
}

export function DataTablePattern() { return <DataTableDemo options={defaultDemoOptions} /> }
export function ConfirmationPattern() { return <AlertDialogDemo options={defaultDemoOptions} /> }
export function NavigationPattern() { return <Stack><BreadcrumbDemo /><TabsDemo options={defaultDemoOptions} /><SidebarDemo /></Stack> }
export function ValidationPattern() { return <ValidationDemo /> }
