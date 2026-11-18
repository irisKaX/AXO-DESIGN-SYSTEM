import { ThemeProvider, TooltipProvider, Toaster } from './design-system'
import { Catalog } from './catalog/Catalog'

function App() {
  return (
    <ThemeProvider storageKey="axo-catalog-theme">
      <TooltipProvider>
        <Catalog />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
