# AXO Design System V1

Samostatná zdrojová knihovna skutečných React komponent, interaktivní katalog
a Playground. Nejde o aplikaci Axolotl. Vzhled je zatím neutrální pracovní základ.

## Lokální spuštění

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Náhled: http://localhost:5173. Vite HMR zůstává aktivní. `npm run lint` spouští
ESLint; kontrola aplikace je `npx tsc --noEmit -p tsconfig.app.json`.

## Struktura

- `src/design-system/` — sdílené komponenty, kompozice, tokeny a ThemeProvider.
- `src/design-system/index.ts` — veřejné exporty pro všechny spotřebitele.
- `src/catalog/` — 61 detailů, foundations, pravidla použití a devět patterns.
- `src/playground/` — lokální sestavování živých ukázek a předpřipravené sestavy.
- `docs/AXO_V1_SPEC.md` — schválené zadání.
- `docs/IMPLEMENTATION_STATUS.md` — průběžný stav, ověření, omezení a změny.
- `docs/SHADCN_INVENTORY.md` — původ oficiálních komponent a vlastních doplňků.

Katalog i Playground importují skutečné komponenty z veřejného API. Knihovna
neimportuje ani jednu z těchto aplikací. Jako spotřebitel může později sloužit
samostatná aplikace Axolotl.

## Použití

```tsx
import { Button, ThemeProvider, TooltipProvider, Toaster } from '@/design-system'

export function App() {
  return (
    <ThemeProvider storageKey="my-app-theme">
      <TooltipProvider>
        <div className="axo-root">
          <Button type="button" onClick={() => console.log('Akce')}>Provést akci</Button>
        </div>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  )
}
```

Hostitelská aplikace používá Tailwind CSS v4. Ve svém globálním CSS importuje
Tailwind, `tw-animate-css`, `shadcn/tailwind.css` a sdílené `design-system/styles.css`.
Současný projekt to dělá v `src/index.css`. Sdílený vstup obsahuje AXO tokeny,
shadcn aliasy, Tailwind mapování i breakpointy. Rozložení katalogu jeho součástí není.

Publikování npm balíčku ani distribuční build nejsou součástí této V1 implementace.
Podrobnosti k API a úpravám shadcn základů jsou v `src/design-system/README.md`.
