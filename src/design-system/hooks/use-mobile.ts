import { useSyncExternalStore } from 'react'

function media() {
  const breakpoint = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md').trim()
  return window.matchMedia(`(width < ${breakpoint})`)
}
function subscribe(onChange: () => void) {
  const query = media()
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
function getSnapshot() { return media().matches }
function getServerSnapshot() { return false }

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
