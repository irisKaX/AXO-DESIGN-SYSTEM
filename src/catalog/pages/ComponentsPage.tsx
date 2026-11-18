import { useId, useState } from 'react'
import { Button, CopyButton, Input, Label, NativeSelect, NativeSelectOption, Table, TableHeader, TableHead, TableRow, TableBody, TableCell, Badge, Grid, Stack, useTheme } from '../../design-system'
import type { ThemeMode } from '../../design-system'
import { componentRegistry } from '../registry'
import { defaultDemoOptions } from '../examples/types'
import type { ComponentDocumentation } from '../docs/types'
import styles from '../Catalog.module.css'
import { DemoControls } from '../components/DemoControls'

function previewWidth(doc: ComponentDocumentation): 'content' | 'field' | 'full' {
  if (doc.category === 'Inputs & Forms' || ['card', 'scroll-area', 'command', 'combobox'].includes(doc.id)) return 'field'
  if (['Data Display', 'Feedback', 'Layout'].includes(doc.category) || doc.id === 'sidebar') return 'full'
  return 'content'
}

function ComponentDetail({ doc }: { doc: ComponentDocumentation }) {
  const id = useId()
  const { mode, setMode } = useTheme()
  const [options, setOptions] = useState({ ...defaultDemoOptions, variant: doc.variants[0] ?? 'default', size: doc.sizes[0] ?? 'default' })
  const Demo = doc.demo
  return <Stack gap={6}>
    <div className="flex flex-wrap items-center justify-between gap-3"><a href="#components" className="underline">← Všechny komponenty</a><Badge variant="outline">{doc.category} · {doc.kind}</Badge></div>
    <p>{doc.description}</p>
    <section aria-labelledby={`${id}-preview`}>
      <h2 id={`${id}-preview`}>Interaktivní ukázka</h2>
      <DemoControls doc={doc} options={options} onChange={setOptions}>
        <Label>Motiv náhledu<NativeSelect aria-label="Motiv náhledu" value={mode} onChange={event => setMode(event.target.value as ThemeMode)}><NativeSelectOption value="light">Light</NativeSelectOption><NativeSelectOption value="dark">Dark</NativeSelectOption><NativeSelectOption value="system">System</NativeSelectOption></NativeSelect></Label>
      </DemoControls>
      <div className={styles.preview} data-preview={doc.id}>
        <div className={styles.previewDemo} data-width={previewWidth(doc)}>
          <Demo key={JSON.stringify(options)} options={options} />
        </div>
      </div>
      <p className={styles.caption}>Hover ověřte myší, Focus Visible klávesou Tab a Active stisknutím. Otevřené prvky ovládejte jejich skutečnými spouštěči. Změna motivu používá společný ThemeProvider, včetně portálů.</p>
    </section>
    <section><h2>Varianty a relevantní stavy</h2><div className="flex flex-wrap gap-2">{[...doc.variants, ...doc.states].map((state, index) => <Badge key={`${state}-${index}`} variant="secondary">{state}</Badge>)}</div></section>
    <section><h2>Veřejné props</h2><Table><TableHeader><TableRow><TableHead>Prop</TableHead><TableHead>Typ</TableHead><TableHead>Význam</TableHead></TableRow></TableHeader><TableBody>{doc.props.map(prop => <TableRow key={prop.name}><TableCell><code>{prop.name}</code></TableCell><TableCell><code>{prop.type}</code></TableCell><TableCell>{prop.description}</TableCell></TableRow>)}</TableBody></Table><p className={styles.caption}>Přehled hlavních props; standardní DOM a ARIA atributy se dědí podle typu prvku. Přesné TypeScript typy jsou součástí veřejných exportů.</p></section>
    <Grid minItemWidth="18rem"><section><h2>Pravidla použití</h2><ul className={styles.documentList}>{doc.usage.recommended.map(item => <li key={item}>{item}</li>)}</ul><h3 className="mt-4 font-semibold">Čemu se vyhnout</h3><ul className={styles.documentList}>{doc.usage.avoid.map(item => <li key={item}>{item}</li>)}</ul></section><section><h2>Přístupnost</h2><ul className={styles.documentList}>{[...doc.accessibility.semantics, ...doc.accessibility.keyboard, ...doc.accessibility.labeling].map(item => <li key={item}>{item}</li>)}</ul></section></Grid>
    <section><div className="flex flex-wrap items-center justify-between gap-3"><h2>Použití v Reactu</h2><CopyButton value={doc.code} /></div><pre className={styles.code}><code>{doc.code}</code></pre>{doc.source && <a href={doc.source} target="_blank" rel="noreferrer" className="underline">Oficiální dokumentace shadcn/ui ↗</a>}</section>
    <div className="flex flex-wrap gap-2"><Button variant="outline" asChild><a href="#playground">Vyzkoušet sestavy v Playgroundu</a></Button><Button variant="outline" asChild><a href="#patterns">Patterns</a></Button></div>
  </Stack>
}

export function ComponentsPage({ componentId }: { componentId?: string }) {
  const [query, setQuery] = useState('')
  const doc = componentRegistry.find(item => item.id === componentId)
  if (doc) return <ComponentDetail key={doc.id} doc={doc} />
  if (componentId) return <p>Komponenta nebyla nalezena. <a href="#components" className="underline">Zpět na přehled</a>.</p>
  const filtered = componentRegistry.filter(item => `${item.name} ${item.description} ${item.category}`.toLocaleLowerCase('cs').includes(query.toLocaleLowerCase('cs')))
  const categories = [...new Set(componentRegistry.map(item => item.category))]
  return <Stack gap={6}>
    <p>{componentRegistry.length} zdokumentovaných komponent a kompozic. Katalog používá stejné veřejné exporty jako samostatná aplikace.</p>
    <Input type="search" aria-label="Hledat komponentu" placeholder="Hledat komponentu nebo kategorii…" value={query} onChange={event => setQuery(event.target.value)} />
    <nav className={styles.subnavigation} aria-label="Kategorie komponent">{categories.map(category => <button type="button" key={category} onClick={() => setQuery(category)}>{category}</button>)}<button type="button" onClick={() => setQuery('')}>Vše</button></nav>
    {!filtered.length && <p role="status">Žádná komponenta neodpovídá hledání.</p>}
    {categories.map(category => {
      const entries = filtered.filter(item => item.category === category)
      return entries.length ? <section key={category}><h2>{category}</h2><Grid minItemWidth="15rem">{entries.map(item => <a className={styles.componentLink} key={item.id} href={`#components/${item.id}`}><strong>{item.name}</strong><span>{item.description}</span><small>{item.kind}</small></a>)}</Grid></section> : null
    })}
  </Stack>
}
