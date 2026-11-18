# AXO Clean Neo Light – mapování a kontrast

Ověřeno 18. 11. 2026 na lokálním náhledu Vite. Schválené hlavní HEX hodnoty jsou zachované. Jde o kontrolu barev a focusu požadovaných komponent a stavů podle WCAG 2.2 AA, nikoli o úplný audit všech kritérií celého projektu.

## Jediný AXO token systém

`tokens/primitives.css` nyní obsahuje jednu společnou Clean Neo paletu. Dřívější Dark overrides primitives byly přesunuty do společných výchozích hodnot; jejich výsledné Dark hodnoty zůstaly shodné. Sémantický Dark blok v `semantic/colors.css` se nezměnil. ThemeProvider, veřejné exporty, funkční logika, rozložení katalogu a Playgroundu jsou beze změn.

Pro schválené Light hodnoty, které dosud neměly primitive, vznikly pouze tyto kroky:

| Primitive | HEX | Light použití |
|---|---|---|
| neutral-65 | #F0F3F8 | surface-inset |
| neutral-75 | #EDF1F7 | surface-muted, interactive-hover, disabled-bg |
| neutral-125 | #E1E7F0 | interactive-pressed |
| neutral-150 | #DDE3EB | border-subtle, divider |
| neutral-175 | #CBD3DF | border |
| purple-75 | #F0E9FF | primary-soft |

Ostatní Light role používají existující Clean Neo primitives. Canvas je #F5F7FB, běžné/elevated/overlay povrchy #FFFFFF. Text primary/secondary/muted/disabled je #141922 / #3D4658 / #576174 / #768195. Primary používá purple-500/600/700 a bílý foreground, focus purple-600. Foundations čtou skutečné computed CSS hodnoty, metadata obsahují pouze názvy tokenů.

## Mapování shadcn

| shadcn role | AXO Light role |
|---|---|
| background / foreground | canvas / text-primary |
| card / card-foreground | surface-elevated / text-primary |
| popover / popover-foreground | surface-overlay / text-primary |
| primary / primary-foreground | primary / primary-foreground |
| secondary / secondary-foreground | surface-muted / text-primary |
| muted / muted-foreground | surface-muted / text-muted |
| accent / accent-foreground | interactive-hover / text-primary |
| destructive | stavový textový alias → danger-text |
| destructive-foreground | danger-foreground |
| border | border |
| input | border-control → neutral-400 (#768195) |
| ring | focus → purple-600 (#6834F4) |
| sidebar / sidebar-foreground | surface / text-primary |
| sidebar-primary / foreground | primary / primary-foreground |
| sidebar-accent / foreground | interactive-selected / text-primary |
| sidebar-border / ring | border / focus |

O2 Blue #0050FF zůstává `--axo-color-secondary` jako brandový akcent; **Light secondary tlačítka a badge jsou neutrální**. Jejich hover používá interactive-pressed. Dark secondary akce nadále používají své schválené modré mapování.

Bright status akcenty se nepoužívají jako drobný text na bílém pozadí. Light `--axo-state-*-color` aliasy mají kontrastní textové/validační role; Dark aliasy se nezměnily. `error` je alias `danger`, nikoli další paleta. Rezervované chart aliasy stále odkazují na AXO stavy; grafy se aktuálně nevykreslují.

## Status role a párování

Všechny následující barvy již existovaly v AXO primitives:

| Stav | Akcent | Soft | Border | Foreground na soft | Text na bílé |
|---|---|---|---|---|---|
| Success | green-500 #9EF01A | green-100 #DFFFAC | green-700 #5E9400 | green-900 #213A00 | green-900 #213A00 |
| Warning | amber-500 #F6DE26 | amber-100 #FFF6AE | amber-800 #79500E | amber-900 #3F3500 | amber-900 #3F3500 |
| Danger | red-500 #FF0A54 | red-100 #FFC0D1 | red-700 #B10038 | red-900 #420015 | red-700 #B10038 |
| Info | cyan-500 #4CC9F0 | cyan-100 #BFEFFC | cyan-700 #0B87A8 | cyan-900 #073847 | cyan-900 #073847 |

Amber-700 má proti warning-soft pouze 2,96:1, proto Light warning-border používá existující amber-800 (6,42:1). Status foreground/soft páry jsou ověřené výpočtem z hodnot CSS tokenů; stávající destructive Badge a Alert byly ověřené přímo v katalogu. Nepřibyly nové varianty komponent.

Sdílený `styles/component-colors.css` nahrazuje původní Dark adaptér a používá jednu sadu pravidel pro obě témata. Dva interakční aliasy rozlišují neutrální secondary hover a čitelný destructive hover v Light od jejich schválených Dark hodnot. Light destructive hover páruje red-300 s red-900; Dark stále používá danger-border s danger-foreground.

## Kontrast

Výpočet používá sRGB relativní luminanci a při průhledných pozadích složení se skutečnými předky. Zobrazené poměry jsou zaokrouhlené; prahy se vyhodnocují z nezaokrouhlených hodnot. V prohlížeči proběhlo 72 měření, z toho 62 různých barevných případů.

Podle [SC 1.4.3 Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) je pro běžný text minimum 4,5:1 a pro velký text 3:1. [SC 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) požaduje 3:1 pro relevantní rozpoznání ovládacích prvků a jejich stavů.

| Kombinace | Poměr | Výsledek |
|---|---:|---|
| Primary Button / Badge, bílá na purple-500 | 4,89:1 | AA běžný text |
| Primary hover / pressed, bílý text | 6,20 / 8,47:1 | AA |
| Secondary Button, text-primary na surface-muted | 15,54:1 | AA |
| Secondary hover, text-primary na interactive-pressed | 14,17:1 | AA |
| Link Button / Badge, purple-600 na bílé | 6,20:1 | AA |
| Text primary / secondary / muted na bílé | 17,62 / 9,48 / 6,24:1 | AA |
| Input text na inset | 15,84:1 | AA |
| Placeholder na inset | 5,61:1 | AA |
| Input / Select hranice proti bílému okolí | 3,93:1 | Nad 3:1 |
| Hranice proti inset / muted | 3,53 / 3,47:1 | Nad 3:1 |
| Checkbox nezaškrtnutá hranice proti bílému okolí | 3,93:1 | Nad 3:1 |
| Zaškrtnutý ovladač, bílý indikátor na primary | 4,89:1 | Nad 3:1 |
| Tabs aktivní / neaktivní text | 13,40 / 5,50:1 | AA |
| Card / Dialog description na bílé | 6,24:1 | AA |
| Dropdown item na zvýrazněném muted pozadí | 15,54:1 | AA |
| FormField error / success text na bílé | 7,18 / 12,58:1 | AA |
| Destructive Button, Badge, Alert a popis na danger-soft | 11,04:1 | AA |
| Destructive hover, red-900 na red-300 | 6,23:1 | AA |
| Success foreground na soft | 11,40:1 | AA; semantic pár |
| Warning foreground na soft | 11,07:1 | AA; semantic pár |
| Info foreground na soft | 10,19:1 | AA; semantic pár |

Neaktivní Tabs původně používaly text s 60% alpha a dosahovaly pouze 4,43:1. Nyní používají text-muted; Dark se tím vizuálně nemění, protože již používal stejnou roli. Zděděná `color` na prázdném grafickém prvku (například Switch track) se nehodnotí jako skutečný text.

### Výjimky a hranice použití

- Obecný border #CBD3DF má na bílé jen 1,51:1 a border-strong není zárukou 3:1. Proto zůstávají pro dekorativní oddělení; rozpoznatelné vstupní hranice používají `border-control` #768195. Outline Button má čitelný popisek, jeho dekorativní border není jediným způsobem identifikace akce.
- Bright success/warning/danger/info akcenty mají jako text na bílé pouze 1,41 / 1,36 / 3,87 / 1,92:1. Hlavní HEX zůstávají zachované; texty používají výše uvedené tmavší role.
- Opacity-disabled zůstává 0,5. Po složení opacity má disabled Primary Button přibližně 2,10:1 a disabled Input 1,72:1. Jde o neaktivní prvky s výjimkou SC 1.4.3 a 1.4.11; nejsou označené jako vyhovující aktivní texty.

## Jediný focus indikátor

Light nyní využívá stejný mechanismus jako schválený Dark: jeden 2px vnější outline s 1px odstupem, bez dalšího Tailwind focus ringu a přebarvování běžného borderu. Původní Light-only focus-border utility byly odstraněny u zdroje v 16 komponentách. Nevznikly další překrývající se border overrides. Stavové a konstrukční bordery zůstávají samostatnými informacemi; validace nepřichází o červený border.

Light focus používá #6834F4. Kontrast proti bílé je 6,20:1, canvas 5,78:1, inset 5,58:1, muted 5,47:1 a selected 4,72:1. Dark focus si zachovává přesně schválenou #B592FF a geometrii 2 px / 1 px.

[SC 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) byl ověřen skutečnou klávesnicí, včetně jediného vlastníka obrysu u InputGroup/Combobox/Command. Pro [SC 2.4.11 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) byla u kontrolovaných cílů ověřena přítomnost ve viewportu a nezakrytý střed včetně dialogu, nabídek a mobilního Playgroundu. Nejde o úplné pokrytí všech možných obsahových konfigurací.

Používá se `:focus-visible`, nikoli obecný `:focus`. Kliknutí na Button a Checkbox obrys nezapnulo. Textový input a nativní select se nadále řídí přirozenou heuristikou prohlížeče. Režim forced-colors ponechává obrys viditelný.

## Funkční a regresní kontrola

- Ověřeno přesných 34 schválených Light rolí z computed CSS, Foundations a všechny požadované komponenty: Button, Input, Select, Checkbox, Tabs, Card, Dialog, Dropdown, Badge, Alert a Playground.
- Před/po byly zachycené styly osmi ukázek a 12 skutečných klávesnicových cílů v obou tématech. Dark běžné i focus styly zůstaly shodné. V obou tématech se zachovaly rozměry, šířky borderů, radiusy, typografie, spacing, trvání přechodů a opacity.
- V Dark zůstaly všechny původní zachycené AXO a shadcn proměnné shodné. Po úpravě neaktivních Tabs byl jejich Dark výstup znovu porovnán s referencí.
- V obou tématech prošlo otevření a ovládání Selectu/Dropdownu, dialogu i návratu focusu, Command filtrování a mobilního Playgroundu. Dark hovery všech šesti variant Buttonu se shodují s referencí. Bez runtime chyb prohlížeče.
- Light/Dark/System funguje; System reaguje na obě emulované hodnoty prefers-color-scheme. Playground umožňuje přidání/odebrání položek a při šířce 390 px nemá horizontální přetečení.
- ThemeProvider, veřejné exporty, komponentová logika a layoutové zdroje zůstaly shodné s výchozími soubory. U komponent byly odstraněné pouze staré Light-only focus-border utility.
- TypeScript (`tsc --noEmit -p tsconfig.app.json`) a ESLint (`eslint src eslint.config.js vite.config.ts`) prošly. Lokální HTTP náhled a HMR na portu 5173 fungují.

U kontrolovaných aktivních barevných kombinací nezůstává otevřený problém vyžadující změnu schválených hlavních HEX hodnot. Nevznikly komponenty, závislosti, testovací framework ani CI/CD. Bez commitu, pushe a deploymentu.

## Změněné soubory

- `docs/CLEAN_NEO_LIGHT_CONTRAST.md`
- `src/catalog/foundations.ts`
- `src/design-system/components/accordion.tsx`
- `src/design-system/components/badge.tsx`
- `src/design-system/components/button.tsx`
- `src/design-system/components/calendar.tsx`
- `src/design-system/components/checkbox.tsx`
- `src/design-system/components/combobox.tsx`
- `src/design-system/components/field.tsx`
- `src/design-system/components/input-group.tsx`
- `src/design-system/components/input.tsx`
- `src/design-system/components/native-select.tsx`
- `src/design-system/components/radio-group.tsx`
- `src/design-system/components/select.tsx`
- `src/design-system/components/switch.tsx`
- `src/design-system/components/tabs.tsx`
- `src/design-system/components/textarea.tsx`
- `src/design-system/components/toggle.tsx`
- `src/design-system/styles.css`
- `src/design-system/styles/component-colors.css`
- `src/design-system/styles/focus.css`
- `src/design-system/styles/shadcn.css`
- `src/design-system/tokens/primitives.css`
- `src/design-system/tokens/semantic/colors.css`
- `src/design-system/tokens/semantic/interaction.css`
- `src/design-system/tokens/semantic/states.css`

Původní `src/design-system/styles/dark-colors.css` byl přejmenován a zobecněn na `src/design-system/styles/component-colors.css`; nevznikla druhá kopie barevných pravidel.
