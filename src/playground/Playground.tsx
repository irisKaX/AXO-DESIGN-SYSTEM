import { useId, useState } from 'react'
import { Button, CopyButton, Label, NativeSelect, NativeSelectOption, Stack, useTheme } from '../design-system'
import type { ThemeMode } from '../design-system'
import { componentRegistry } from '../catalog/registry'
import { patternRegistry } from '../catalog/patterns/registry'
import { DemoControls } from '../catalog/components/DemoControls'
import { defaultDemoOptions } from '../catalog/examples/types'
import type { DemoOptions } from '../catalog/examples/types'
import styles from '../catalog/Catalog.module.css'

interface PlaygroundItem { instance: number; componentId: string; options: DemoOptions }
function initialItem(componentId: string, instance: number): PlaygroundItem {
  const doc = componentRegistry.find(item => item.id === componentId)!
  return { instance, componentId, options: { ...defaultDemoOptions, variant: doc.variants[0] ?? 'default', size: doc.sizes[0] ?? 'default' } }
}

export function Playground() {
  const { mode, setMode } = useTheme()
  const id = useId()
  const [componentId, setComponentId] = useState('button')
  const [items, setItems] = useState<PlaygroundItem[]>(() => [initialItem('input', 1), initialItem('button', 2), initialItem('card', 3)])
  const [nextInstance, setNextInstance] = useState(4)
  const [preset, setPreset] = useState('custom')
  const selectedPattern = patternRegistry.find(pattern => pattern.id === preset)
  const Pattern = selectedPattern?.render
  return <Stack gap={6}>
    <p>Kombinujte živé ukázky stejných AXO komponent, měňte jejich varianty a zkoušejte interakce. Sestava zůstává lokálně v paměti.</p>
    <div className={styles.controls}>
      <Label htmlFor={`${id}-theme`}>Motiv<NativeSelect id={`${id}-theme`} value={mode} onChange={event => setMode(event.target.value as ThemeMode)}><NativeSelectOption value="light">Light</NativeSelectOption><NativeSelectOption value="dark">Dark</NativeSelectOption><NativeSelectOption value="system">System</NativeSelectOption></NativeSelect></Label>
      <Label htmlFor={`${id}-preset`}>Předpřipravená sestava<NativeSelect id={`${id}-preset`} value={preset} onChange={event => setPreset(event.target.value)}><NativeSelectOption value="custom">Vlastní sestava</NativeSelectOption>{patternRegistry.map(pattern => <NativeSelectOption key={pattern.id} value={pattern.id}>{pattern.name}</NativeSelectOption>)}</NativeSelect></Label>
    </div>
    {Pattern ? <section className={styles.preview}><h2>{selectedPattern?.name}</h2><Pattern /></section> : <>
      <div className={styles.controls}><Label htmlFor={`${id}-component`}>Komponenta<NativeSelect id={`${id}-component`} value={componentId} onChange={event => setComponentId(event.target.value)}>{componentRegistry.map(doc => <NativeSelectOption key={doc.id} value={doc.id}>{doc.name}</NativeSelectOption>)}</NativeSelect></Label><Button type="button" disabled={items.length >= 12} onClick={() => { setItems([...items, initialItem(componentId, nextInstance)]); setNextInstance(nextInstance + 1) }}>Přidat komponentu</Button><Button type="button" variant="outline" onClick={() => setItems([])} disabled={!items.length}>Vyprázdnit sestavu</Button><CopyButton value={JSON.stringify(items, null, 2)}>Kopírovat konfiguraci</CopyButton></div>
      <p className={styles.caption}>Nejvýše 12 položek. Měníte konfiguraci ukázky, nikoli zdrojové soubory komponent.</p>
      {!items.length && <p role="status">Sestava je prázdná. Přidejte první komponentu.</p>}
      {items.map((item, index) => {
        const doc = componentRegistry.find(doc => doc.id === item.componentId)!
        const Demo = doc.demo
        return <section key={item.instance} className={styles.playgroundItem} data-playground-item={doc.id}>
          <div className="flex flex-wrap items-center justify-between gap-3"><h2>{doc.name}</h2><div className="flex flex-wrap gap-2"><Button type="button" variant="outline" size="sm" aria-label={`Posunout ${doc.name} nahoru`} disabled={index === 0} onClick={() => setItems(previous => { const result = [...previous]; [result[index - 1], result[index]] = [result[index], result[index - 1]]; return result })}>↑</Button><Button type="button" variant="outline" size="sm" aria-label={`Posunout ${doc.name} dolů`} disabled={index === items.length - 1} onClick={() => setItems(previous => { const result = [...previous]; [result[index + 1], result[index]] = [result[index], result[index + 1]]; return result })}>↓</Button><Button type="button" variant="outline" size="sm" onClick={() => setItems(items.filter(entry => entry.instance !== item.instance))}>Odebrat {doc.name}</Button></div></div>
          <DemoControls doc={doc} options={item.options} onChange={options => setItems(items.map(entry => entry.instance === item.instance ? { ...entry, options } : entry))} />
          <div className={styles.preview}><Demo key={JSON.stringify(item.options)} options={item.options} /></div>
          <a href={`#components/${doc.id}`} className="underline">Dokumentace {doc.name}</a>
        </section>
      })}
    </>}
  </Stack>
}
