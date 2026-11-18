# Původ komponent AXO V1

Oficiální registr: https://ui.shadcn.com/docs/components
Preset projektu: `radix-nova`; instalace proběhla přes nakonfigurované shadcn CLI.
Dostupnost byla před instalací ověřena přes `shadcn search @shadcn --type ui --json`.

## Oficiální shadcn zdroje

- `accordion` — `src/design-system/components/accordion.tsx`
- `alert` — `src/design-system/components/alert.tsx`
- `alert-dialog` — `src/design-system/components/alert-dialog.tsx`
- `aspect-ratio` — `src/design-system/components/aspect-ratio.tsx`
- `avatar` — `src/design-system/components/avatar.tsx`
- `badge` — `src/design-system/components/badge.tsx`
- `breadcrumb` — `src/design-system/components/breadcrumb.tsx`
- `button` — `src/design-system/components/button.tsx`
- `button-group` — `src/design-system/components/button-group.tsx`
- `calendar` — `src/design-system/components/calendar.tsx`
- `card` — `src/design-system/components/card.tsx`
- `checkbox` — `src/design-system/components/checkbox.tsx`
- `collapsible` — `src/design-system/components/collapsible.tsx`
- `combobox` — `src/design-system/components/combobox.tsx`
- `command` — `src/design-system/components/command.tsx`
- `context-menu` — `src/design-system/components/context-menu.tsx`
- `dialog` — `src/design-system/components/dialog.tsx`
- `drawer` — `src/design-system/components/drawer.tsx`
- `dropdown-menu` — `src/design-system/components/dropdown-menu.tsx`
- `empty` — `src/design-system/components/empty.tsx`
- `field` — `src/design-system/components/field.tsx`
- `hover-card` — `src/design-system/components/hover-card.tsx`
- `input` — `src/design-system/components/input.tsx`
- `input-group` — `src/design-system/components/input-group.tsx`
- `kbd` — `src/design-system/components/kbd.tsx`
- `label` — `src/design-system/components/label.tsx`
- `menubar` — `src/design-system/components/menubar.tsx`
- `native-select` — `src/design-system/components/native-select.tsx`
- `navigation-menu` — `src/design-system/components/navigation-menu.tsx`
- `pagination` — `src/design-system/components/pagination.tsx`
- `popover` — `src/design-system/components/popover.tsx`
- `progress` — `src/design-system/components/progress.tsx`
- `radio-group` — `src/design-system/components/radio-group.tsx`
- `scroll-area` — `src/design-system/components/scroll-area.tsx`
- `select` — `src/design-system/components/select.tsx`
- `separator` — `src/design-system/components/separator.tsx`
- `sheet` — `src/design-system/components/sheet.tsx`
- `sidebar` — `src/design-system/components/sidebar.tsx`
- `skeleton` — `src/design-system/components/skeleton.tsx`
- `slider` — `src/design-system/components/slider.tsx`
- `sonner` — `src/design-system/components/sonner.tsx`
- `spinner` — `src/design-system/components/spinner.tsx`
- `switch` — `src/design-system/components/switch.tsx`
- `table` — `src/design-system/components/table.tsx`
- `tabs` — `src/design-system/components/tabs.tsx`
- `textarea` — `src/design-system/components/textarea.tsx`
- `toggle` — `src/design-system/components/toggle.tsx`
- `toggle-group` — `src/design-system/components/toggle-group.tsx`
- `tooltip` — `src/design-system/components/tooltip.tsx`

Součástí instalace je také mobilní hook Sidebaru. Některé soubory poskytují více
veřejných dílčích komponent; nejde o kopie jedné komponenty.

## Nezbytné integrační úpravy

- Sonner: stávající AXO useTheme namísto dalšího next-themes.
- Progress: předává hodnotu/max do ARIA kořene, vypočítává procento vůči max
  a rozlišuje neurčitý průběh.
- Slider: přístupné názvy jednotlivých thumb ovladačů.
- Mobilní hook: useSyncExternalStore a centrální emitovaný breakpoint md.
- ESLint: pojmenované výjimky pouze pro standardní variant helpers a kontextové
  hooky exportované z oficiálních shadcn souborů. Ostatní pravidla zůstávají aktivní.

## Kompozice a vlastní minimum

- Icon/Loading/Copy Button: skutečný Button + ikona/Spinner/Clipboard API.
- Number Input/File Upload: skutečný Input s nativním typem, callbacky a DOM chováním.
- FormField: oficiální Field, Label, Description a Error + propojení ARIA atributů.
- Date Picker: oficiální Popover + Calendar + Button podle dokumentované kompozice.
- Segmented Control: veřejné aliasy oficiálního ToggleGroup/ToggleGroupItem.
- Data Table: oficiální Table a aktuální TanStack Table v9 podle shadcn průvodce;
  vzor v design-system/patterns, nikoliv kopie Table.
- Container/Stack/Grid/Flex: minimální běžné DOM rozložení; odpovídající UI položky
  nebyly v ověřeném shadcn registru k dispozici.
- Validation States a Loading States: funkční vzory, nikoliv nové základní komponenty.

Dokumentace kompozic: https://ui.shadcn.com/docs/components/radix/date-picker
Průvodce tabulkou: https://ui.shadcn.com/docs/components/radix/data-table

Oficiální Combobox má také v Radix presetu závislost na Base UI; zachováváme
jeho přístupnou oficiální implementaci. Další alternativní framework nepřidáváme.
