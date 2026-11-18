import { useEffect, useRef, useSyncExternalStore } from 'react'
import { useTheme, NativeSelect, NativeSelectOption, Label } from '../design-system'
import type { ThemeMode } from '../design-system'
import { Playground } from '../playground/Playground'
import { FoundationsPage } from './pages/FoundationsPage'
import { ComponentsPage } from './pages/ComponentsPage'
import { PatternsPage } from './patterns/PatternsPage'
import { patternRegistry } from './patterns/registry'
import { componentRegistry } from './registry'
import styles from './Catalog.module.css'

const sections = [{ id: 'foundations', label: 'Foundations' }, { id: 'components', label: 'Components' }, { id: 'patterns', label: 'Patterns' }, { id: 'playground', label: 'Playground' }] as const
function subscribe(onChange: () => void) { window.addEventListener('hashchange', onChange); return () => window.removeEventListener('hashchange', onChange) }
function snapshot() { return window.location.hash.slice(1) || 'foundations' }
function serverSnapshot() { return 'foundations' }

export function Catalog() {
  const route = useSyncExternalStore(subscribe, snapshot, serverSnapshot)
  const [sectionId, detailId] = route.split('/')
  const section = sections.find(item => item.id === sectionId)
  const detail = componentRegistry.find(item => sectionId === 'components' && item.id === detailId) ?? patternRegistry.find(item => sectionId === 'patterns' && item.id === detailId)
  const title = detail?.name ?? section?.label ?? 'Stránka nebyla nalezena'
  const { mode, resolvedTheme, setMode } = useTheme()
  const contentRef = useRef<HTMLElement>(null)
  const previousRoute = useRef(route)
  useEffect(() => {
    document.title = `${title} · AXO Design System`
    if (previousRoute.current !== route) { contentRef.current?.focus(); previousRoute.current = route }
  }, [title, route])
  return <div className={styles.shell}>
    <a className={styles.skipLink} href="#catalog-content" onClick={event => { event.preventDefault(); contentRef.current?.focus() }}>Přejít na obsah</a>
    <header className={styles.header}><div><a href="#foundations" className={styles.brand}>AXO Design System</a><p className={styles.caption}>V1 · pracovní interaktivní katalog</p></div><div className={styles.themeControl}><Label htmlFor="catalog-theme">Režim zobrazení</Label><NativeSelect id="catalog-theme" value={mode} onChange={event => setMode(event.target.value as ThemeMode)} aria-describedby="catalog-resolved-theme"><NativeSelectOption value="light">Light</NativeSelectOption><NativeSelectOption value="dark">Dark</NativeSelectOption><NativeSelectOption value="system">System</NativeSelectOption></NativeSelect><span id="catalog-resolved-theme" className={styles.caption}>Aktivní: {resolvedTheme === 'dark' ? 'Dark' : 'Light'}</span></div></header>
    <div className={styles.layout}><nav className={styles.navigation} aria-label="Sekce katalogu">{sections.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={sectionId === id ? 'page' : undefined}>{label}</a>)}<p className={styles.caption}>{componentRegistry.length} komponent a kompozic<br />{patternRegistry.length} funkčních patterns</p></nav><main ref={contentRef} id="catalog-content" className={styles.content} tabIndex={-1}><h1>{title}</h1>{sectionId === 'foundations' && <FoundationsPage groupId={detailId} />}{sectionId === 'components' && <ComponentsPage componentId={detailId} />}{sectionId === 'patterns' && <PatternsPage patternId={detailId} />}{sectionId === 'playground' && <Playground />}{!section && <a href="#foundations" className="underline">Zpět na Foundations</a>}</main></div>
  </div>
}
