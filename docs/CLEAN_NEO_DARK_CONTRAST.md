# Clean Neo Dark – barevné mapování a kontrast

Ověřeno 17. 11. 2026 v lokálním katalogu na portu 5173. Změna se týká barev Dark Mode. ThemeProvider, rozložení, typografie, rozměry, spacing, radiusy, přechody a funkční logika zůstávají zachované.

## Jediný zdroj barev

- Primitives obsahují schválenou paletu. Existující kroky potřebné pro Light si zachovávají své původní hodnoty; jejich Clean Neo hodnoty se přepínají pouze pod `data-axo-theme="dark"`. Původní zelená/žlutá/červená `800` zůstávají kvůli kompatibilitě s Light, Dark semantic role je nepoužívají.
- Chybějící graphite povrchy a světlé stavové foreground barvy jsou rovněž definované v primitives. Semantic tokeny obsahují pouze odkazy. `--axo-color-error` je alias `--axo-color-danger`.
- shadcn `background/foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring` a sidebar používají AXO role. Card používá elevated povrch, popovery a dialogy overlay povrch, formulářové prvky inset povrch.
- Chart aliasy nadále odkazují na AXO stavové tokeny; projekt zatím nevykresluje grafy. Nevznikla další chart paleta.
- Foundations čtou skutečné hodnoty přes CSS proměnné; metadata obsahují pouze názvy tokenů.

## Párování pro přístupnost

Schválené HEX hodnoty nebyly měněny. Tři dodatečné semantic role rozlišují účel barvy:

- `primary-text` → purple-300: purple-500 na surface má jen 3,60:1, proto malé odkazy používají světlejší schválený odstín.
- `border-control` → neutral-400: obecný border neutral-600 na inset má jen 1,95:1. Zůstává pro dekorativní okraje; shadcn `input` používá čitelnější hranici ovládacího prvku.
- `danger-text` → red-300: samotná red-500 na elevated má jen 3,86:1. Validační texty a invalid hranice používají světlejší red-300. Destructive Button, Badge a Alert párují danger-foreground s danger-soft. Hover destruktivní akce používá danger-border s danger-foreground.

Společný Dark barevný adaptér zachovává přesné Primary hover/pressed odstíny a upravuje pouze barvy existujících stavů radix-nova. Sdílená třída Buttonu pokrývá také `asChild` kompozice, například potvrzovací akci v AlertDialogu. Focus používá plnou focus barvu; jeho sjednocená geometrie je popsána níže. Disabled opacity zůstává 0,5.

## Výsledky

Kontrast byl počítán ze sRGB relativní luminance, u průhledných pozadí po složení se skutečnými předky. V prohlížeči bylo změřeno 58 kombinací; tabulka uvádí relevantní texty a indikátory, nikoli zděděnou barvu na prázdných grafických prvcích. Čísla jsou zaokrouhlena pouze pro zobrazení.

Podle [WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) je minimum pro běžný text 4,5:1, pro velký text 3:1. [SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) požaduje 3:1 pro relevantní vizuální informace ovládacích prvků a jejich stavů.

| Kombinace | Kontrast | Výsledek |
|---|---:|---|
| Primary, bílá / purple-500 | 4,89:1 | AA běžný text |
| Primary hover / pressed, bílý text | 6,20 / 8,47:1 | AA |
| Secondary, bílá / blue-500 | 5,85:1 | AA |
| Secondary hover, bílá / blue-600 | 8,06:1 | AA |
| Button/Badge link, purple-300 / surface | 7,15:1 | AA |
| Input placeholder, neutral-300 / inset | 7,34:1 | AA |
| Input/Select hranice, neutral-400 / okolní surface | 4,48:1 | Nad 3:1 |
| Stejná hranice na elevated povrchu | 3,80:1 | Nad 3:1; výpočet semantic páru |
| Invalid hranice, red-300 / okolní surface | 6,49:1 | Nad 3:1 |
| Focus na surface / overlay / elevated | 7,15 / 6,92 / 6,06:1 | Nad 3:1; elevated ověřeno výpočtem páru |
| Card title / description na elevated | 13,94 / 5,94:1 | AA |
| Dialog title / description na overlay | 15,91 / 6,79:1 | AA |
| Tabs aktivní / neaktivní text | 14,17 / 6,19:1 | AA |
| Aktivní Tabs border / okolní muted povrch | 6,31:1 | Nad 3:1 |
| Destructive Button, Badge, Alert a popis / danger-soft | 11,04:1 | AA |
| Destructive Button hover / danger-border | 4,69:1 | AA |
| Success foreground / success-soft | 11,40:1 | AA; výpočet semantic páru |
| Warning foreground / warning-soft | 11,07:1 | AA; výpočet semantic páru |
| Info foreground / info-soft | 10,19:1 | AA; výpočet semantic páru |
| Text primary / canvas | 18,35:1 | AA; výpočet semantic páru |
| Text secondary / elevated | 9,62:1 | AA; výpočet semantic páru |

Disabled Button má po složení opacity 0,5 kontrast přibližně 2,92:1, disabled Input přibližně 1,95:1. Jde o neaktivní ovládací prvky, na které se vztahuje výjimka SC 1.4.3 a 1.4.11. Nejsou označené jako vyhovující aktivní texty.

Dekorativní card/alert bordery a danger-border na danger-soft nemusí dosáhnout 3:1. Nejsou jediným identifikátorem akce nebo stavu: informaci předává čitelný text, u akcí navíc samostatný fokus. Tyto odstíny nejsou mapované jako hranice běžného inputu.

## Funkční a regresní ověření

- Původní proměnné Light a computed styly výchozích Button, Input, Select, Card, Dialog triggeru, Tabs, Badge a Alert byly porovnány před/po: bez změn. Stejné porovnání rozměrů, typografie, paddingu, radiusů a trvání přechodů neodhalilo změny ani v Dark.
- Ověřeny varianty Button a Badge, default/destructive Alert, otevřený Select, Card, otevřený Dialog včetně návratu fokusu, hover/pressed/focus potvrzovací akce, interakce Tabs, formulářové stavy a Foundations.
- Playground používá stejné nové barvy; přidávání/odebírání položek funguje. Náhled při šířce 390 px neměl horizontální přetečení.
- Light/Dark přepínání a System reagující na obě hodnoty `prefers-color-scheme` fungují se stávajícím ThemeProviderem. Nebyly zaznamenány runtime chyby prohlížeče.
- TypeScript (`tsc --noEmit -p tsconfig.app.json`) a ESLint (`eslint src eslint.config.js vite.config.ts`) prošly. HTTP náhled a Vite HMR websocket na portu 5173 fungují.
- Kontrola systémových CSS nenašla barevné literály mimo centrální primitives. Barvy demonstračního obsahu zůstaly zachované. Nevznikla testovací infrastruktura, závislosti ani build.

U kontrolovaných aktivních kombinací nezůstává nevyřešený kontrast vyžadující změnu schválených HEX hodnot. Jde o kontrolu barev uvedených komponent a stavů, nikoli o úplný audit všech kritérií WCAG celého projektu.

## Focus Visible v Dark Mode

### Skutečná příčina dvou fialových obrysů

Vnitřní linku tvořil běžný 1px border přebarvený utilitou `focus-visible:border-ring` v `native-select.tsx`, `select.tsx`, `input.tsx`, `button.tsx` a dalších sdílených komponentách. Původní generovaný selektor byl:

```css
.focus-visible\:border-ring:focus-visible {
  border-color: var(--ring); /* Dark: #B592FF */
}
```

Vnější linku vykresloval `outline` v `styles/focus.css`, pod selektorem `[data-axo-theme='dark'] :focus-visible`, s barvou `--axo-interaction-focus-color`. Katalogové `.shell :is(a, select, main):focus-visible` nastavuje tutéž vlastnost outline; nepředstavuje další samostatnou kreslicí vrstvu. Tailwind `--tw-ring-shadow` a `--tw-ring-offset-shadow` už byly při focusu transparentní. Poslední duplicitu tedy tvořil **fialový border + fialový outline**.

### Oprava u zdroje

Focus utility měnící border jsou nyní podmíněné variantou `not-dark:`, například `not-dark:focus-visible:border-ring`. Stejné omezení se vztahuje na složená pole a focus modifikátor kalendáře. Používá se inverze existujícího custom Dark selektoru Tailwindu, nikoli nové CSS přepisující barvu borderu.

Dark nyní kreslí **jediný 2px vnější outline, odstup 1 px, barva #B592FF**. Nativní Select, SelectTrigger a Input mají při focusu stejný neutrální border jako bez focusu (`--input`, v Dark #768195). Běžný Button zachovává transparentní border, jeho outline varianta běžný neutrální border. Existující stavové barvy vybraných Tabs, zaškrtnutých ovladačů, validačních stavů a statický border Slider thumbu se nepřebarvují; nejsou novým focus indikátorem.

Společný focus styl zůstává jediným vlastníkem vnějšího obrysu a potlačuje Tailwind focus ring. Složené InputGroup, Combobox a Command mají obrys jen na společném kontejneru. Do `focus.css` nebylo přidáno nové překrývající se pravidlo, pouze vysvětlující komentář. Dark interakční token `focus-width` se změnil z 1 na 2 px, offset zůstává 1 px. Light zachovává původní styly i tokeny 2 px / 4 px.

### Viditelnost a WCAG 2.2

- [SC 2.4.7 Focus Visible, AA](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html): ověřené klávesnicové cíle mají viditelný obrys po dobu focusu.
- [SC 1.4.11 Non-text Contrast, AA](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html): #B592FF má proti Dark povrchům kontrast 6,06–7,99:1, nad požadovanými 3:1. Surface 7,15:1, muted 6,31:1, elevated 6,06:1, overlay 6,92:1, inset 7,49:1, canvas 7,99:1.
- [SC 2.4.11 Focus Not Obscured, AA](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html): u ověřených cílů byla kontrolována přítomnost ve viewportu a nezakrytý střed, včetně dialogu, nabídek a mobilního Playgroundu.
- [SC 2.4.13 Focus Appearance, AAA](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html): samostatný 2px vnější obrys s odstupem poskytuje alespoň referenční plochu 2px obvodu bez započítávání vnitřního borderu. Nejde o deklaraci plné úrovně AAA celého systému ani úplný audit všech kombinací a případů ořezu indikátoru.

### Ověření

- Čerstvé porovnání 12 klávesnicových cílů před/po v obou tématech: NativeSelect v Button katalogu, Button, Input, SelectTrigger, Checkbox, RadioGroup, Switch, Tabs, Slider, InputGroup, Combobox a Accordion.
- Light computed styly včetně focusu a dodatečně chybného inputu zůstaly přesně shodné. V obou tématech se nezměnily běžné styly, rozměry, šířky borderů, radiusy, typografie, textové barvy, pozadí a přechody.
- Kontrola screenshotu v pixelech: před opravou dva oddělené fialové pásy (border + outline), po opravě jediný souvislý 2px vnější pás, 1px mezera a neutrální vnitřní border. U Selectu zůstává border před i během focusu `rgb(118, 129, 149)`.
- Ověřen Command včetně filtrování, otevřený Select a DropdownMenu, navigační odkaz, dialog i návrat focusu, mobilní Playground při 390 px, forced-colors a nezměněné hovery všech šesti variant Buttonu. Bez runtime chyb prohlížeče.
- Styl nadále používá `:focus-visible`; skutečný klik na Button a Checkbox obrys nezapnul. Textový input a nativní select se řídí přirozenou heuristikou prohlížeče, která může focus-visible zobrazit i při kliknutí. Nevznikla vlastní logika modality.
- TypeScript a ESLint prošly. Lokální náhled a Vite HMR byly zachované. Bez závislostí, testovací infrastruktury, commitu, pushe a deploymentu.

### Změněné soubory při opravě duplicity

Focus utility v `src/design-system/components/` (pouze přidání `not-dark:`):

- `accordion.tsx`
- `badge.tsx`
- `button.tsx`
- `calendar.tsx`
- `checkbox.tsx`
- `combobox.tsx`
- `field.tsx`
- `input-group.tsx`
- `input.tsx`
- `native-select.tsx`
- `radio-group.tsx`
- `select.tsx`
- `switch.tsx`
- `tabs.tsx`
- `textarea.tsx`
- `toggle.tsx`

Další změny:

- `src/design-system/tokens/semantic/interaction.css` – Dark focus-width 2 px.
- `src/design-system/styles/focus.css` – pouze komentář vysvětlující vlastnictví focusu a běžného borderu.
- `docs/CLEAN_NEO_DARK_CONTRAST.md` – tento záznam příčiny, opravy a ověření.
