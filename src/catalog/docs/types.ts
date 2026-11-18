import type { ComponentType } from 'react'
import type { DemoProps, DemoOptions } from '../examples/types'

export type ComponentCategory = 'Buttons & Actions' | 'Inputs & Forms' | 'Navigation' | 'Data Display' | 'Feedback' | 'Overlays' | 'Layout'
export type BooleanControl = Exclude<keyof DemoOptions, 'variant' | 'size'>
export interface PropDocumentation { name: string; type: string; description: string }
export interface ComponentDocumentation {
  id: string
  name: string
  description: string
  category: ComponentCategory
  kind: 'component' | 'composition' | 'pattern'
  demo: ComponentType<DemoProps>
  variants: readonly string[]
  sizes: readonly string[]
  controls: readonly BooleanControl[]
  states: readonly string[]
  props: readonly PropDocumentation[]
  code: string
  source?: string
  usage: { recommended: readonly string[]; avoid: readonly string[] }
  accessibility: { semantics: readonly string[]; keyboard: readonly string[]; labeling: readonly string[] }
}
