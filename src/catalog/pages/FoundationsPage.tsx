import { useEffect, useState } from 'react'
import { Check, Search, Settings, X } from 'lucide-react'
import { useTheme } from '../../design-system'
import { foundationGroups } from '../foundations'
import styles from '../Catalog.module.css'

export function FoundationsPage({ groupId }: { groupId?: string }) {
  const { mode, resolvedTheme } = useTheme()
  const [values, setValues] = useState<Record<string, string>>({})
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const computed = getComputedStyle(document.documentElement)
      setValues(Object.fromEntries(foundationGroups.flatMap(group => group.tokens.map(name => [name, computed.getPropertyValue(name).trim()]))))
    })
    return () => cancelAnimationFrame(frame)
  }, [resolvedTheme])
  const groups = groupId ? foundationGroups.filter(group => group.id === groupId) : foundationGroups
  return <>
    <p>Pracovní neutrální foundations. Hodnoty pocházejí přímo z centrálních CSS tokenů.</p>
    <nav className={styles.subnavigation} aria-label="Foundations">
      <a href="#foundations">Vše</a>
      {foundationGroups.map(group => <a key={group.id} href={`#foundations/${group.id}`} aria-current={groupId === group.id ? 'page' : undefined}>{group.title}</a>)}
      <a href="#foundations/theme">Theme</a>
    </nav>
    {(!groupId || groupId === 'theme') && <section className={styles.tokenGroup}>
      <h2>Dark / Light / System Theme</h2>
      <p>Zvolený režim: <strong>{mode}</strong>. Aktivní motiv: <strong>{resolvedTheme}</strong>.</p>
      <p>Jediný ThemeProvider nastavuje <code>data-axo-theme</code>. System reaguje na nastavení zařízení.</p>
    </section>}
    <div className={styles.tokenGroups}>
      {groups.map(group => <section key={group.id} className={styles.tokenGroup}>
        <h2>{group.title}</h2>
        {group.kind === 'icon' && <div className="flex gap-4" aria-label="Ikony Lucide"><Search aria-label="Hledat" /><Settings aria-label="Nastavení" /><Check aria-label="Potvrdit" /><X aria-label="Zavřít" /></div>}
        {group.kind === 'breakpoint' && <p className={styles.caption}>Kompilační tokeny Tailwindu: sm:, md:, lg:, xl:, 2xl:.</p>}
        <ul>{group.tokens.map(name => {
          const value = values[name] || '…'
          const isColor = /^(#|rgb|oklch|hsl|color\()/.test(value)
          return <li key={name} className={styles.tokenRow}>
            {isColor && <span className={styles.swatch} style={{ background: `var(${name})` }} aria-hidden="true" />}
            {group.kind === 'shadow' && <span className={styles.swatch} style={{ boxShadow: `var(${name})` }} aria-hidden="true" />}
            <code>{name}</code><output>{value}</output>
          </li>
        })}</ul>
      </section>)}
    </div>
    {groupId && groupId !== 'theme' && !groups.length && <p>Tato foundation neexistuje. Vyberte položku z přehledu.</p>}
  </>
}
