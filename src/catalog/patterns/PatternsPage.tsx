import { Stack, Grid } from '../../design-system'
import { patternRegistry } from './registry'
import styles from '../Catalog.module.css'

export function PatternsPage({ patternId }: { patternId?: string }) {
  const pattern = patternRegistry.find(item => item.id === patternId)
  if (pattern) { const Pattern = pattern.render; return <Stack><a href="#patterns" className="underline">← Všechny patterns</a><p>{pattern.description}</p><div className={styles.preview}><Pattern /></div><p className={styles.caption}>Lokální funkční demonstrace. Sestava importuje stejné veřejné AXO komponenty; nepřidává backend ani kopie UI.</p></Stack> }
  return <Stack><p>Funkční vzory použití složené ze sdílených komponent. Všechna data jsou demonstrační.</p><Grid>{patternRegistry.map(item => <a className={styles.componentLink} href={`#patterns/${item.id}`} key={item.id}><strong>{item.name}</strong><span>{item.description}</span></a>)}</Grid></Stack>
}
