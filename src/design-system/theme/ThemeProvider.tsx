import { useEffect, useLayoutEffect, useMemo, useState, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import { ThemeContext } from './ThemeContext'
import type { ThemeMode } from './ThemeContext'

export interface ThemeProviderProps {
  children: ReactNode
  defaultMode?: ThemeMode
  /** Persistence is opt-in; the host application owns the storage key. */
  storageKey?: string
}

const systemQuery = '(prefers-color-scheme: dark)'

function subscribeToSystemTheme(onChange: () => void) {
  const media = window.matchMedia(systemQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function getSystemTheme() {
  return window.matchMedia(systemQuery).matches
}

function getServerTheme() {
  return false
}

function readMode(storageKey: string | undefined, fallback: ThemeMode): ThemeMode {
  if (!storageKey || typeof window === 'undefined') return fallback
  try {
    const value = window.localStorage.getItem(storageKey)
    return value === 'light' || value === 'dark' || value === 'system' ? value : fallback
  } catch {
    return fallback
  }
}

/** Mount once at the application root. Theme CSS is imported separately. */
export function ThemeProvider({ children, defaultMode = 'system', storageKey }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => readMode(storageKey, defaultMode))
  const systemIsDark = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme, getServerTheme)
  const resolvedTheme = mode === 'system' ? (systemIsDark ? 'dark' : 'light') : mode

  useLayoutEffect(() => {
    const root = document.documentElement
    const previousTheme = root.getAttribute('data-axo-theme')
    root.setAttribute('data-axo-theme', resolvedTheme)
    return () => {
      if (previousTheme === null) root.removeAttribute('data-axo-theme')
      else root.setAttribute('data-axo-theme', previousTheme)
    }
  }, [resolvedTheme])

  useEffect(() => {
    if (!storageKey) return
    try {
      window.localStorage.setItem(storageKey, mode)
    } catch {
      // A blocked or full storage must not prevent switching themes.
    }
  }, [mode, storageKey])

  const value = useMemo(() => ({ mode, resolvedTheme, setMode }), [mode, resolvedTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
