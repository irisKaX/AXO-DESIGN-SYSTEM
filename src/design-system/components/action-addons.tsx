import { useEffect, useState } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from './button'
import { Spinner } from './spinner'

type ButtonProps = ComponentProps<typeof Button>

export function IconButton({ label, icon, size = 'default', ...props }: Omit<ButtonProps, 'children' | 'size' | 'asChild'> & {
  label: string
  icon: ReactNode
  size?: 'xs' | 'sm' | 'default' | 'lg'
}) {
  const iconSize = size === 'default' ? 'icon' : `icon-${size}` as const
  return <Button type="button" aria-label={label} size={iconSize} {...props}>{icon}</Button>
}

export function LoadingButton({ loading = false, loadingText = 'Načítání…', children, disabled, ...props }: Omit<ButtonProps, 'asChild'> & {
  loading?: boolean
  loadingText?: string
}) {
  return <Button type="button" {...props} disabled={disabled || loading} aria-busy={loading}>
    {loading && <Spinner aria-hidden="true" />}{loading ? loadingText : children}
  </Button>
}

export function CopyButton({ value, children = 'Kopírovat', onCopied, ...props }: Omit<ButtonProps, 'onClick' | 'asChild'> & {
  value: string
  onCopied?: () => void
}) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  useEffect(() => {
    if (status === 'idle') return
    const timer = setTimeout(() => setStatus('idle'), 2500)
    return () => clearTimeout(timer)
  }, [status])
  return <span className="inline-flex flex-col gap-1">
    <Button type="button" variant="outline" {...props} onClick={async () => {
      try { await navigator.clipboard.writeText(value); setStatus('copied'); onCopied?.() }
      catch { setStatus('error') }
    }}>{status === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{status === 'copied' ? 'Zkopírováno' : children}</Button>
    <span className="text-xs text-muted-foreground" role="status">{status === 'error' ? 'Kopírování se nepodařilo. Zkontrolujte oprávnění schránky.' : status === 'copied' ? 'Text je ve schránce.' : ''}</span>
  </span>
}
