import type { ComponentProps, CSSProperties } from 'react'
import { cn } from '../lib/utils'

export type Space = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16
type LayoutProps = ComponentProps<'div'> & { gap?: Space }
const gapValue = (gap: Space) => `var(--axo-space-${gap})`

export function Container({ className, style, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full min-w-0', className)} style={{ maxWidth: '80rem', paddingInline: 'var(--axo-layout-padding)', ...style }} {...props} />
}

export function Flex({ gap = 4, className, style, direction = 'row', align = 'stretch', justify = 'flex-start', wrap = true, ...props }: LayoutProps & {
  direction?: CSSProperties['flexDirection']
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  wrap?: boolean
}) {
  return <div className={cn('flex min-w-0', className)} style={{ gap: gapValue(gap), flexDirection: direction, alignItems: align, justifyContent: justify, flexWrap: wrap ? 'wrap' : 'nowrap', ...style }} {...props} />
}

export function Stack({ gap = 4, ...props }: LayoutProps) {
  return <Flex {...props} gap={gap} direction="column" wrap={false} />
}

export function Grid({ gap = 4, minItemWidth = '14rem', className, style, ...props }: LayoutProps & { minItemWidth?: string }) {
  return <div className={cn('grid min-w-0', className)} style={{ gap: gapValue(gap), gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minItemWidth}), 1fr))`, ...style }} {...props} />
}
