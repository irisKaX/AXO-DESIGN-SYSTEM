# AXO Design System

Veřejné API je `index.ts`. Obsahuje oficiální shadcn/ui radix-nova komponenty,
kompozice a pomocné typy. Nesmí importovat katalog ani Playground.

## Styly a tokeny

Hostitel s Tailwind CSS v4 importuje svůj globální CSS vstup jednou:

```css
@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';
@import './design-system/styles.css';
```

`styles.css` spojuje primitives, semantic tokeny, kompilační breakpointy,
shadcn aliasy a Tailwind mapování. Třída `axo-root` poskytuje základní typografii
a barvy; neurčuje rozložení aplikace. Preflight pochází z hostitelského Tailwind vstupu.

Konkrétní AXO hodnoty jsou v `tokens/primitives.css`; významové role jsou
v `tokens/semantic/`. `styles/shadcn.css` pouze odkazuje na tyto role. Nevytváří
nezávislou paletu. `styles/tailwind-theme.css` propojuje barvy, spacing, typografii,
radiusy a stíny s utilitami shadcn/Tailwind. `tokens/breakpoints.css` je jediný
zdroj vlastních breakpointů. Používá `@theme static`, protože média potřebují
kompilační hodnoty; mobilní hook čte odpovídající emitovanou CSS proměnnou.

## ThemeProvider

Jeden provider na kořeni aplikace spravuje `data-axo-theme` na `html`:

- `defaultMode`: `system`, `light` nebo `dark`.
- `storageKey`: volitelné uložení preference. Bez něj se nic neukládá.
- `useTheme()`: `mode`, `resolvedTheme`, `setMode`.

Varianta `dark:` používá stejný atribut. Portály proto dostávají správný motiv.
Sonner používá pouze AXO `useTheme`; `next-themes` není potřeba. `Toaster` patří
jednou pod provider, stejně jako `TooltipProvider`. Nevytvářet druhý ThemeProvider.

## Komponenty a kompozice

`components/` obsahuje oficiální zdroje shadcn. Jednotlivé soubory jsou jedinými
implementacemi; `action-addons.tsx`, `form-addons.tsx` a `layout.tsx` je pouze skládají.

- IconButton, CopyButton a LoadingButton používají stejný Button.
- NumberInput a FileUpload používají skutečný Input a nativní chování prohlížeče.
- FormField dodává ID, popisek, nápovědu a chybovou/success zprávu přes render prop.
- DatePicker skládá Popover, Calendar a Button; podporuje řízené i neřízené jedno datum.
- Container, Stack, Grid a Flex jsou minimální layout nad běžnými DOM prvky.
- SegmentedControl a SegmentedControlItem jsou aliasy ToggleGroup a ToggleGroupItem.
- `patterns/data-table.tsx` je obecný vzor nad Table a TanStack Table v9. Pro měnící
  se data předávejte stabilní `getRowId`; sloupce používejte přes veřejný createColumnHelper.

Props lze odvodit přes `React.ComponentProps<typeof Button>` atd. Doplňkové typy
(DatePickerProps, FieldControlProps, DataTableProps, DataTableFeatures, DateRange,
ThemeMode, Space) jsou také veřejně exportované.

## Údržba

`components.json` směruje UI do `design-system/components`, helpery do `lib/`
a hooky do `hooks/`. Oficiální Combobox používá Base UI i v Radix presetu;
nejde o druhou AXO implementaci. Detail původu a úprav je v `docs/SHADCN_INVENTORY.md`.

Při opětovném CLI add/overwrite zkontrolujte integrační úpravy Sonneru, Progressu,
Slideru a mobilního hooku. Neprovádějte znovu init/preset přes vlastní mapování.
UI změny mají vycházet z tokenů a schváleného zadání, nikoli z kreativního redesignu.
