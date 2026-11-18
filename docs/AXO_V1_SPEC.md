# AXO DESIGN SYSTEM V1
## Kompletní implementační zadání

### 1. Kontext projektu

Pracujeme v existujícím repository `AXO-DESIGN-SYSTEM`.

Projekt již obsahuje:
- React + TypeScript + Vite
- Tailwind CSS v4
- Inicializované shadcn/ui s presetem `radix-nova`
- AXO design tokeny
- ThemeProvider s režimy Light, Dark a System
- Katalog a Playground
- Importní alias `@/*`
- AGENTS.md

Nejdřív prozkoumej skutečný stav projektu a přečti AGENTS.md.

**Cíl:** Vybudovat kompletní první verzi znovupoužitelného AXO Design Systemu pomocí shadcn/ui.

Nejde o finální aplikaci Axolotl. Jde o samostatnou knihovnu komponent a jejich interaktivní katalog.

Vizuální identitu budeme upravovat až po dokončení funkčního základu.

### 2. Zásadní architektonická pravidla

- Používej existující architekturu `design-system/`, `catalog/` a `playground/`.
- Preferuj existující komponenty shadcn/ui.
- Nevytvářej vlastní implementaci, pokud existuje vhodný funkční základ.
- Jedna komponenta musí mít jeden zdroj pravdy.
- Katalog nesmí obsahovat duplicitní implementace komponent.
- Všechny komponenty musí být znovupoužitelné mimo katalog.
- Varianty musí sdílet jednu základní implementaci.
- Design tokeny jsou centrálním zdrojem vizuálních hodnot.
- Zachovej ThemeProvider a přepínání Light/Dark/System.
- Zachovej veřejné exporty přes `design-system/index.ts`.
- Nevytvářej druhý nezávislý systém tokenů nebo témat.
- Zachovej přístupnost, ovládání klávesnicí a viditelné focus stavy.
- Používej aktuální stabilní API instalovaných verzí závislostí.
- Nezaváděj nový framework ani alternativní UI knihovnu bez skutečné potřeby.

### 3. Foundations

Dokonči centrální systém:

- Color Primitives
- Semantic Colors
- Typography
- Spacing
- Border Radius
- Borders
- Shadows
- Elevation
- Opacity
- Motion & Transitions
- Interaction States
- Status Colors
- Breakpoints
- Iconography
- Dark / Light / System Theme

Vytvoř přehledové stránky, kde lze hodnoty tokenů prohlížet.

Vizuální hodnoty zatím mohou být neutrální. Neprováděj kreativní redesign.

### 4. Komponenty

Implementuj následující oblasti.

**Buttons & Actions**
- Button
- Icon Button
- Button Group
- Copy Button
- Loading Button

**Inputs & Forms**
- Text Input
- Textarea
- Select
- Native Select
- Checkbox
- Radio Group
- Switch
- Slider
- Number Input
- Date Picker
- Calendar
- File Upload
- Input Group
- Form Field
- Label
- Validation States

**Navigation**
- Tabs
- Segmented Control
- Breadcrumbs
- Pagination
- Navigation Menu
- Dropdown Menu
- Context Menu
- Menubar
- Sidebar

**Data Display**
- Card
- Badge
- Avatar
- Table
- Data Table
- Accordion
- Tooltip
- Separator
- Scroll Area
- Empty State
- Kbd

**Feedback**
- Alert
- Toast / Sonner
- Progress
- Skeleton
- Spinner
- Loading States

**Overlays**
- Dialog
- Alert Dialog
- Drawer
- Sheet
- Popover
- Hover Card
- Command
- Combobox

**Layout**
- Container
- Stack
- Grid
- Flex
- Aspect Ratio
- Collapsible

U každé komponenty nejprve ověř, zda existuje ve shadcn/ui.

Pokud existuje, použij její oficiální implementaci. Pokud neexistuje, vytvoř vlastní minimální znovupoužitelnou komponentu pouze tam, kde to dává smysl.

Rozlišuj skutečné UI komponenty od vzorů použití, například Data Table nebo Loading State.

### 5. Varianty a stavy

U každé komponenty připrav všechny relevantní varianty a stavy.

Podle typu komponenty zejména:
- Default
- Hover
- Focus Visible
- Active / Pressed
- Disabled
- Loading
- Error / Invalid
- Success
- Read Only
- Selected
- Open / Closed
- Empty / Filled
- Sizes

Nevytvářej stavy, které pro danou komponentu nedávají smysl.

U interaktivních stavů zajisti skutečnou funkčnost. Kde nelze stav trvale zobrazit bez simulace, připrav dokumentační náhled nebo vhodný demonstrátor.

### 6. Interaktivní katalog

Rozšiř existující katalog.

Požadovaná hlavní navigace:
- Foundations
- Components
- Patterns
- Playground

Komponenty rozděl do přehledných kategorií.

Každá komponenta musí mít vlastní detail obsahující:
- Název a stručný popis
- Interaktivní živou ukázku
- Přepínání relevantních variant
- Přepínání velikostí
- Ukázky relevantních stavů
- Dark/Light preview
- Přehled veřejných props
- Pravidla použití
- Poznámky k přístupnosti
- Ukázku použití v Reactu

Všechny ukázky musí importovat skutečné sdílené komponenty.

Nevytvářej jejich vizuální kopie.

### 7. Patterns

Připrav funkční ukázkové sestavy z existujících komponent:

- Přihlašovací formulář
- Nastavení profilu
- Vyhledávání a filtrování
- Datová tabulka s akcemi
- Potvrzovací dialog
- Formulář s validací
- Navigační sestava
- Dashboardové karty
- Prázdné a chybové stavy

Patterns nesmí obsahovat vlastní kopie základních UI komponent.

### 8. Playground

Rozšiř existující Playground tak, aby umožňoval:

- Kombinovat skutečné komponenty
- Přepínat motiv
- Měnit dostupné varianty a velikosti
- Zkoušet interakce
- Prohlížet předpřipravené sestavy

Pro V1 není potřeba drag & drop editor ani vizuální builder.

### 9. Design a UX katalogu

Použij čistý, neutrální a přehledný pracovní styl.

Požadavky:
- Responzivní layout
- Srozumitelná navigace
- Konzistentní spacing a typografie
- Dobrá čitelnost v Dark i Light Mode
- Jasně oddělené náhledy od dokumentace
- Žádné zbytečné dekorativní animace
- Žádné nepoužívané komponenty nebo prázdné stránky

Nefinalizuj zatím značkové barvy, gradienty, efekty ani speciální hover animace.

### 10. Postup implementace

Úkol je rozsáhlý. Rozděl jej interně do navazujících etap:

1. Foundations a ověření architektury
2. Instalace základních shadcn komponent
3. Formuláře a navigace
4. Data Display, Feedback a Overlays
5. Layout a vlastní doplňkové komponenty
6. Interaktivní katalog a dokumentace
7. Patterns a Playground
8. Závěrečná kontrola propojení a funkčnosti

Pokračuj jednotlivými etapami bez nutnosti schvalovat každou komponentu.

Nevytvářej však rozsáhlé paralelní implementace, které by mohly způsobit konflikty.

Pokud narazíš na zásadní architektonické rozhodnutí nebo destruktivní změnu, zastav se a vysvětli problém.

Veď průběžný přehled dokončených a zbývajících částí v `docs/IMPLEMENTATION_STATUS.md`, aby bylo možné pokračovat v další relaci bez ztráty kontextu.

### 11. Technická omezení

- Zachovej stávající Vite HMR.
- Lokální náhled musí fungovat na localhost:5173.
- Nepřidávej Storybook.
- Nepřidávej backend ani databázi.
- Nepřidávej testovací framework ani CI/CD workflow.
- Neprováděj deployment.
- Neprováděj commit ani push bez výslovného souhlasu.
- Nespouštěj zbytečné rozsáhlé testy.
- Je povolena přiměřená kontrola TypeScriptu, ESLintu a funkčnosti náhledu.
- Zachovej existující funkční části projektu.

### 12. Kritéria dokončení

V1 považuj za dokončenou pouze tehdy, pokud:

- Jsou implementovány všechny domluvené oblasti nebo je každá výjimka výslovně zdokumentována.
- Katalog obsahuje funkční ukázky skutečných sdílených komponent.
- Komponenty používají AXO tokeny.
- Dark/Light/System funguje napříč knihovnou.
- Komponenty jsou použitelné i mimo katalog.
- Playground používá stejné komponenty.
- Neexistují paralelní duplicity základních komponent.
- Projekt funguje v lokálním náhledu.
- TypeScript a ESLint nehlásí chyby.
- Dokumentace odpovídá skutečné implementaci.

Na konci vytvoř stručný souhrn:
- Co bylo implementováno
- Co zbývá
- Jaké kompromisy byly nutné
- Které soubory byly změněny
- Zda je V1 připravena k vizuálnímu redesignu

Nevydávej nedokončenou práci za kompletní V1.