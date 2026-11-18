# AXO Design System V1 — stav implementace

Stav: **dokončeno pro funkční V1 a připraveno k následnému vizuálnímu redesignu**.
Zadání: `docs/AXO_V1_SPEC.md`. Vzhled zůstává neutrální pracovní základ.

## Etapy

- [x] 1. Foundations a ověření architektury
- [x] 2. Instalace základních shadcn komponent
- [x] 3. Formuláře a navigace
- [x] 4. Data Display, Feedback a Overlays
- [x] 5. Layout a vlastní doplňkové komponenty
- [x] 6. Interaktivní katalog a dokumentace
- [x] 7. Patterns a Playground
- [x] 8. Závěrečná kontrola propojení a funkčnosti

## Implementované oblasti

Katalog obsahuje 61 detailů. Každý detail má skutečnou živou ukázku, relevantní
ovládání variant/velikostí/stavů, přepnutí motivu, hlavní props, pravidla použití,
přístupnost a React ukázku. Přesné kompletní API určují exportované TypeScript typy.

### Buttons & Actions

- [x] Button — `#components/button` (component).
- [x] Icon Button — `#components/icon-button` (composition).
- [x] Button Group — `#components/button-group` (component).
- [x] Copy Button — `#components/copy-button` (composition).
- [x] Loading Button — `#components/loading-button` (composition).

### Inputs & Forms

- [x] Text Input — `#components/input` (component).
- [x] Textarea — `#components/textarea` (component).
- [x] Select — `#components/select` (component).
- [x] Native Select — `#components/native-select` (component).
- [x] Checkbox — `#components/checkbox` (component).
- [x] Radio Group — `#components/radio-group` (component).
- [x] Switch — `#components/switch` (component).
- [x] Slider — `#components/slider` (component).
- [x] Number Input — `#components/number-input` (composition).
- [x] Date Picker — `#components/date-picker` (composition).
- [x] Calendar — `#components/calendar` (component).
- [x] File Upload — `#components/file-upload` (composition).
- [x] Input Group — `#components/input-group` (component).
- [x] Form Field — `#components/form-field` (composition).
- [x] Label — `#components/label` (component).
- [x] Validation States — `#components/validation-states` (pattern).

### Navigation

- [x] Tabs — `#components/tabs` (component).
- [x] Segmented Control — `#components/segmented-control` (composition).
- [x] Breadcrumbs — `#components/breadcrumb` (component).
- [x] Pagination — `#components/pagination` (component).
- [x] Navigation Menu — `#components/navigation-menu` (component).
- [x] Dropdown Menu — `#components/dropdown-menu` (component).
- [x] Context Menu — `#components/context-menu` (component).
- [x] Menubar — `#components/menubar` (component).
- [x] Sidebar — `#components/sidebar` (component).

### Data Display

- [x] Card — `#components/card` (component).
- [x] Badge — `#components/badge` (component).
- [x] Avatar — `#components/avatar` (component).
- [x] Table — `#components/table` (component).
- [x] Data Table — `#components/data-table` (pattern).
- [x] Accordion — `#components/accordion` (component).
- [x] Tooltip — `#components/tooltip` (component).
- [x] Separator — `#components/separator` (component).
- [x] Scroll Area — `#components/scroll-area` (component).
- [x] Empty State — `#components/empty` (component).
- [x] Kbd — `#components/kbd` (component).

### Feedback

- [x] Alert — `#components/alert` (component).
- [x] Toast / Sonner — `#components/sonner` (component).
- [x] Progress — `#components/progress` (component).
- [x] Skeleton — `#components/skeleton` (component).
- [x] Spinner — `#components/spinner` (component).
- [x] Loading States — `#components/loading-states` (pattern).

### Overlays

- [x] Dialog — `#components/dialog` (component).
- [x] Alert Dialog — `#components/alert-dialog` (component).
- [x] Drawer — `#components/drawer` (component).
- [x] Sheet — `#components/sheet` (component).
- [x] Popover — `#components/popover` (component).
- [x] Hover Card — `#components/hover-card` (component).
- [x] Command — `#components/command` (component).
- [x] Combobox — `#components/combobox` (component).

### Layout

- [x] Container — `#components/container` (composition).
- [x] Stack — `#components/stack` (composition).
- [x] Grid — `#components/grid` (composition).
- [x] Flex — `#components/flex` (composition).
- [x] Aspect Ratio — `#components/aspect-ratio` (component).
- [x] Collapsible — `#components/collapsible` (component).

## Foundations

Color Primitives, Semantic Colors, Typography, Spacing, Border Radius, Borders,
Shadows, Elevation, Opacity, Motion & Transitions, Interaction States, Status Colors,
Breakpoints, Iconography a Dark/Light/System Theme mají prohlížitelné stránky.
Hodnoty se čtou z centrálních CSS tokenů. Shadcn proměnné nejsou druhou paletou.

## Patterns a Playground

Devět funkčních sestav: přihlášení, profil, vyhledávání/filtrování, datová tabulka
s akcemi, potvrzovací dialog, validace, navigace, dashboardové karty, prázdné/chybové stavy.

Playground používá stejné ukázky a skutečné komponenty, umožňuje přidat/odebrat
položky, měnit pořadí, varianty, velikosti, relevantní stavy a motiv, načíst
předpřipravené sestavy a kopírovat konfiguraci. Neobsahuje drag & drop builder.

## Ověření

- TypeScript: `tsc --noEmit -p tsconfig.app.json` a `-p tsconfig.node.json` bez chyb.
- ESLint: `eslint src eslint.config.js vite.config.ts` bez chyb a varování.
- Prohlížeč: všech 61 detailů, 9 patterns a Playground byly vykresleny bez runtime chyb.
- Ověřeno 163 kombinací variant/stavů v přehledovém průchodu a dalších 42 cílených
  voleb variant/velikostí; nejde o počet unikátních kombinací celého API.
- Skutečné interakce: Button, Checkbox klávesnicí, Select, hledatelný Combobox,
  Slider klávesnicí, DatePicker, Dialog/fokus/Escape, AlertDialog se změnou dat,
  Drawer, Sheet, Command, Data Table (filtr/řazení/stránkování/prázdný stav),
  validace a loading přihlášení, hledání/reset, přidání/odebrání/preset Playgroundu.
- Light/Dark/System, mobilní šířka 390 px a všech 61 detailů bez vodorovného přesahu.
- Opravy review ověřeny v prohlížeči: mobilní Sidebar skutečně otevře Sheet,
  desktopový se sbalí; Progress s max=200 odpovídá ARIA i délce indikátoru;
  success border odpovídá AXO tokenu; reduced-motion zkracuje animace.
- CSS samostatného hostitele z veřejného styles.css se přeloží s tokeny,
  breakpointy, dark variantou, stavovými pravidly a reduced-motion, bez CSS katalogu.
- Lokální Vite náhled na localhost:5173 vrací HTTP 200 pro HTML, globální CSS i veřejný modul. HMR WebSocket se úspěšně připojil při závěrečné kontrole.

Kontroly byly jednorázové; nebyla vytvořena testovací infrastruktura, CI ani build.
Při vizuálním redesignu znovu ověřit kontrast, klávesnici, portály a responzivitu.

## Omezení a kompromisy V1

- DatePicker V1 vybírá jedno datum; Calendar veřejně podporuje také multiple/range
  a katalog tyto režimy ukazuje. Samostatný DatePicker pro rozsah nebyl přidán.
- File Upload je nativní výběr souborů a callback File[]; odeslání a serverové
  ověření jsou úlohou hostitelské aplikace. Backend je zadáním vyloučen.
- Patterns používají lokální demonstrační data a simulují dokončení operací;
  nejsou skutečnou autentizací ani perzistentní aplikací.
- Playground drží sestavu v paměti a umožňuje kopírovat její konfiguraci.
- Ukázky kódu s callbacky/data očekávají jejich definici v hostitelské aplikaci.
- Dokumentace uvádí hlavní props; děděné DOM/ARIA API je v TypeScript typech
  a navázané oficiální dokumentaci.
- Oficiální Combobox přináší Base UI i v Radix presetu. Sonner používá pouze AXO
  ThemeProvider; next-themes bylo odstraněno. Přesné původy a adaptace popisuje
  `docs/SHADCN_INVENTORY.md`.
- Distribuční build/npm publikace nejsou součástí této implementace a nebyly spuštěny.
- Exportované shadcn variant helpers mají cílené ESLint výjimky; při změně takových
  exportů může Vite místo zachování lokálního stavu provést běžný reload.

## Co zbývá

Žádná neimplementovaná domluvená funkční oblast. Zdokumentovaná omezení výše
platí pro V1. Další práce je schválený vizuální redesign; zatím není prováděn.

## Změněné a přidané soubory

- `README.md`
- `package.json`
- `package-lock.json`
- `eslint.config.js`
- `docs/AXO_V1_SPEC.md`
- `docs/IMPLEMENTATION_STATUS.md`
- `docs/SHADCN_INVENTORY.md`
- `src/App.tsx`
- `src/main.tsx`
- `src/index.css`
- `src/catalog/Catalog.module.css`
- `src/catalog/Catalog.tsx`
- `src/catalog/components/DemoControls.tsx`
- `src/catalog/docs/README.md`
- `src/catalog/docs/types.ts`
- `src/catalog/examples/ActionsForms.tsx`
- `src/catalog/examples/DisplayFeedback.tsx`
- `src/catalog/examples/Navigation.tsx`
- `src/catalog/examples/OverlaysLayout.tsx`
- `src/catalog/examples/README.md`
- `src/catalog/examples/types.ts`
- `src/catalog/foundations.ts`
- `src/catalog/pages/ComponentsPage.tsx`
- `src/catalog/pages/FoundationsPage.tsx`
- `src/catalog/patterns/PatternDemos.tsx`
- `src/catalog/patterns/PatternsPage.tsx`
- `src/catalog/patterns/README.md`
- `src/catalog/patterns/registry.ts`
- `src/catalog/registry.ts`
- `src/design-system/README.md`
- `src/design-system/components/README.md`
- `src/design-system/components/accordion.tsx`
- `src/design-system/components/action-addons.tsx`
- `src/design-system/components/alert-dialog.tsx`
- `src/design-system/components/alert.tsx`
- `src/design-system/components/aspect-ratio.tsx`
- `src/design-system/components/avatar.tsx`
- `src/design-system/components/badge.tsx`
- `src/design-system/components/breadcrumb.tsx`
- `src/design-system/components/button-group.tsx`
- `src/design-system/components/button.tsx`
- `src/design-system/components/calendar.tsx`
- `src/design-system/components/card.tsx`
- `src/design-system/components/checkbox.tsx`
- `src/design-system/components/collapsible.tsx`
- `src/design-system/components/combobox.tsx`
- `src/design-system/components/command.tsx`
- `src/design-system/components/context-menu.tsx`
- `src/design-system/components/dialog.tsx`
- `src/design-system/components/drawer.tsx`
- `src/design-system/components/dropdown-menu.tsx`
- `src/design-system/components/empty.tsx`
- `src/design-system/components/field.tsx`
- `src/design-system/components/form-addons.tsx`
- `src/design-system/components/hover-card.tsx`
- `src/design-system/components/input-group.tsx`
- `src/design-system/components/input.tsx`
- `src/design-system/components/kbd.tsx`
- `src/design-system/components/label.tsx`
- `src/design-system/components/layout.tsx`
- `src/design-system/components/menubar.tsx`
- `src/design-system/components/native-select.tsx`
- `src/design-system/components/navigation-menu.tsx`
- `src/design-system/components/pagination.tsx`
- `src/design-system/components/popover.tsx`
- `src/design-system/components/progress.tsx`
- `src/design-system/components/radio-group.tsx`
- `src/design-system/components/scroll-area.tsx`
- `src/design-system/components/select.tsx`
- `src/design-system/components/separator.tsx`
- `src/design-system/components/sheet.tsx`
- `src/design-system/components/sidebar.tsx`
- `src/design-system/components/skeleton.tsx`
- `src/design-system/components/slider.tsx`
- `src/design-system/components/sonner.tsx`
- `src/design-system/components/spinner.tsx`
- `src/design-system/components/switch.tsx`
- `src/design-system/components/table.tsx`
- `src/design-system/components/tabs.tsx`
- `src/design-system/components/textarea.tsx`
- `src/design-system/components/toggle-group.tsx`
- `src/design-system/components/toggle.tsx`
- `src/design-system/components/tooltip.tsx`
- `src/design-system/hooks/use-mobile.ts`
- `src/design-system/index.ts`
- `src/design-system/patterns/data-table-features.ts`
- `src/design-system/patterns/data-table.tsx`
- `src/design-system/styles/base.css`
- `src/design-system/styles/tailwind-theme.css`
- `src/design-system/styles.css`
- `src/design-system/tokens/breakpoints.css`
- `src/design-system/tokens/primitives.css`
- `src/playground/Playground.tsx`
- `src/playground/compositions/README.md`

AGENTS.md, existující ThemeProvider, semantic tokeny a konfigurace Vite/aliasů zůstaly zachovány.
Commit, push, deployment, backend, databáze, Storybook ani CI nebyly provedeny.
