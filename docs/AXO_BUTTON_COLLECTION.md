# AXO Button Collection – barvy a gradientní efekty

Implementace a ověření: 18. 11. 2026. Existující velikosti, pill/circle radius, typografie, spacing, ikony a funkční logika zůstávají zachované. Nové efekty jsou čistě CSS a nepřidávají vnitřní obal kolem textu ani ikon.

## Varianty a tokeny

- `default` zůstává standardní Primary Solid: #7C4BFE, bílý text, stávající AXO primary-hover/pressed. Nemá gradient ani glow.
- `secondary` používá Button-specific semantic role: AXO surface (#141922 Dark / #FFFFFF Light), border AXO primary #7C4BFE, text-primary. Hover a pressed používají příslušné AXO interakční povrchy. Globální shadcn `secondary`, Badge, sidebar a barevné palety se nemění.
- `gradient` používá sdílený `--axo-gradient-signature` a bílý `--axo-button-signature-foreground`.
- `gradient-border` kombinuje stejný gradient pouze na borderu, AXO surface uvnitř, text-primary a nepřetržitý pohyb borderového highlightu už v klidu.
- Ghost, Outline, Destructive a Link si zachovávají význam, API a původní mapování.

```tsx
<Button>Hlavní akce</Button>
<Button variant="secondary">Vedlejší akce</Button>
<Button variant="gradient">AXO Signature</Button>
<Button variant="gradient-border">Signature Border</Button>
<IconButton label="Nastavení" icon={<Settings aria-hidden="true" />} variant="gradient-border" />
```

Nové varianty jsou dostupné v existujícím katalogu Button, Icon Button a Loading Button. Katalog i Playground používají skutečné sdílené komponenty, nikoli jejich kopie.

## Přesný gradient a schválená kontrastní vrstva

Primitives obsahují pouze tři přidané Signature stop barvy. Žádná původní hodnota globální palety se nezměnila:

| Pozice | Primitive | HEX |
|---|---|---|
| 0 % | --axo-signature-start | #4B13BF |
| 50 % | --axo-signature-middle | #5821CF |
| 100 % | --axo-signature-end | #168EDA |

Jediný výplňový gradient používá explicitní sRGB interpolaci s úhlem 90°. Zastávky 0/50/100 % jsou stejné ve všech stavech. Reverzní token byl odstraněn.

Samotný přesný gradient má proti bílému textu poměry 9,79 / 8,29 / 3,55:1. Modrý konec tedy nesplňuje 4,5:1 pro běžný text. Jednotný tmavý text zase nevyhoví na fialovém konci.

Uživatelka schválila jednotnou tmavou AXO overlay vrstvu a upřednostnila rezervu alespoň 5:1. Používá se neutral-950 #0B0F17, **22 %**. Pro srovnání: 16 % dává minimum 4,65:1, 20 % pouze 4,99:1. Zastávky gradientního tokenu se nemění; vykreslené barvy jsou záměrně mírně ztmavené schválenou vrstvou. Nevzniká lokální podklad pod popiskem.

Kontrastní vrstva je součástí host backgroundu. Chrání proto i nativní `input` použitý přes `asChild`, kde nemusí fungovat pseudo-elementy. V klidu má 22 %, při hoveru 21 % a při stisku celkových 28 %. Nepřidává se další lokální podklad pod textem.

## Jemný hover výplně

Hover animuje pouze opacity jednotné tmavé vrstvy z 22 % na 21 % a zpět za 200 ms s AXO ease-out. Jde o záměrně velmi jemné zvýšení intenzity (u modrého konce přibližně dva stupně modrého kanálu). Žádná barva se nepřesouvá, gradient se neobrací ani nevyměňuje. Výplň nemá dekorativní pseudo-elementy, `clip-path` ani reverzní animační tokeny.

Animuje se registrovaná číselná CSS vlastnost `--axo-signature-overlay`. Standardní přechody hostu zůstávají zachované; gradientový přechod je součástí mergeovatelných CVA/Tailwind utilities, takže jej spotřebitel může přepsat přes `className` (například `transition-none`). Výchozí pozicování je v CSS components layer a zachovává spotřebitelské `absolute`/`fixed`.

Hover zesílení se používá pouze na zařízeních s `(hover: hover)`. Při reduced-motion se změna aplikuje staticky bez animace. Disabled/aria-disabled nereaguje na hover ani pressed. Stisk stále používá 28% krytí a stávající posun tlačítka.

## Orbital Glow a budoucí opětovné použití

Sdílená třída `axo-orbital-border` používá rotující conic světelný segment maskovaný na hranici tlačítka. Princip vychází z [referenčního ShimmerButtonu](https://21st.dev/@dillionverma/components/shimmer-button) a jeho [oficiálního zdroje](https://magicui.design/r/shimmer-button.json); nevzniká druhá komponenta ani nové vnitřní obaly.

Registrovaný úhel se nepřetržitě mění 0–360° za **3000 ms**, lineárně, už ve výchozím stavu včetně dotykových zařízení. Konce cyklu vykreslují stejný obraz. Segment používá AXO Signature barvy a pozvolný transparentní náběh/doběh; nehýbe se host ani vnitřní povrch. Blur zůstává 1 px, opacity je 0,6 v klidu a 0,7 při hoveru. Hover nemění čas ani existenci animace.

Dekorativní vrstva má pointer-events none a je izolovaná pod obsahem. Maskování vylučuje vnitřní plochu, nemění rozměry ani radius a neřeže klávesnicový outline. Focus-visible (včetně potomka) a disabled/aria-disabled animaci pozastaví a skryjí. Při reduced-motion pseudo-element vůbec nevzniká: zůstane statický AXO gradientní border.

Animace nemá JS smyčku ani layout změny. Změna úhlu conic gradientu může průběžně překreslovat malou dekorativní vrstvu; nejde o garantovanou animaci pouze na kompozitoru. Výkon velkého počtu současně viditelných instancí nebyl profilován.

Třída je použitelná na nereplaced hostu se standardním 1px AXO borderem, dědí radius a nepřidává padding hostu. Povrch lze řídit přes `--axo-orbital-surface`. Pro budoucí Card není nutné kopírovat efekt; pro nativní Input je určen wrapper. U budoucího Inputu musí zůstat samostatná dostatečně kontrastní vstupní hranice. Žádné Card/Input varianty nyní nevznikly.

## Kontrast a přístupnost

[WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) požaduje pro běžný text 4,5:1; [SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) vyžaduje 3:1 pro relevantní vizuální informace ovládacích prvků. Ověření je zaměřené na požadované barvy, stavy a focus, nikoli úplný audit všech kritérií WCAG.

| Kombinace | Minimální kontrast |
|---|---:|
| Primary Solid, bílá na #7C4BFE | 4,89:1 |
| Primary hover / pressed | 6,20 / 8,47:1 |
| Secondary text / surface, Light | 17,62:1 |
| Secondary text / surface, Dark | 16,43:1 |
| Signature, klidový overlay 22 % | 5,17:1 |
| Signature, hover overlay 21 % a celý přechod 21–22 % | nejméně 5,08:1 |
| Signature pressed, celkový overlay 28 % | 5,77:1 |
| Gradient-border text / vnitřní povrch, Light / Dark | 17,62 / 16,43:1 |

Aktuální výpočet zahrnuje 10 001 pozic gradientu pro krytí 21, 22 a 28 %. Nejhorší je modrý stop: přesně 5,0826 / 5,1746 / 5,7707:1. Luminance sRGB směsí je konvexní; žádná mezilehlá barva nepřekročí jas nejjasnější zastávky. Plynulý přechod mezi 21 a 28 % proto neklesne pod minimum hoveru. Rasterizace je ověřená v obou tématech, včetně mezilehlých časů hoveru a návratu. Při měření pozadí je dočasně skrytý ink textu, aby nebyly antialiasované pixely glyphů zaměněné za pozadí.

**Gradientní border je dekorativní.** V Dark na #141922 mají jeho tři nezměněné stop barvy přibližně 1,80 / 2,13 / 4,96:1. Ne všechny části splňují 3:1 a nejsou vydávané za samostatný přístupný vstupní border. Tlačítko identifikuje kontrastní text/ikona; focus zajišťuje samostatný obrys.

[Focus Visible SC 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) zůstává na jediném 2px obrysu s 1px mezerou. Glow při něm není viditelný. Pill/circle tvar a rozměry 24/28/32/36 px ikon zůstávají zachované. Disabled si ponechává opacity 0,5, neprovádí akci a má výjimku z kontrastu pro neaktivní prvky; uvedené aktivní minimální poměry se pro něj nedeklarují.

Reduced-motion odstraní pohybové efekty. **Samotné splnění reduced-motion a skrytí při focusu není prohlášením plné shody s [WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).** Pro nepřetržitý automatický pohyb musí hostitelská aplikace při posuzování tohoto kritéria zajistit dostupné trvalé zastavení/skrytí pohybu. Focus-bound pause tuto roli nesplňuje. V tomto úkolu nevzniká nová globální preference ani ovládání katalogu; systémová preference omezeného pohybu funguje okamžitě.

## Ověření této opravy

Ověření používá skutečné sdílené komponenty v lokálním katalogu, bez přidání testovací infrastruktury. Zahrnuje výchozí běh orbitu bez hoveru, snímky osmi pozic kolem obvodu a shodu 0/3000 ms, zachování vnitřního povrchu, hover bez restartu, výplň a návrat v časech 0/50/100/150/200 ms, pressed, focus, disabled, reduced-motion a touch v Light/Dark. Dále kontrolu existujících variant, velikostí, ikon a loading logiky, TypeScript, ESLint a lokální Vite HMR.

Výsledky: 56 kontrol efektů a 6 API/klávesnicových případů prošlo bez runtime chyb. Minimum naměřené rasterizované výplně je 5,26:1 (matematické minimum celé funkce 5,08:1). Porovnání 184 kombinací zachovalo všechny sledované styly kromě zadaného gradientového přechodu; Input, Select, Card a ButtonGroup zůstaly shodné. Prošlo také 120 stavových a 64 loading kombinací. TypeScript, ESLint a HTTP/HMR spojení Vite na localhost:5173 prošly. Nová ověřovací infrastruktura do projektu nepřibyla.

## Omezení a fallbacky

- Výplňový gradient a jeho krytí fungují i na nativním asChild inputu. Pro maskovaný Orbital Glow je potřeba nereplaced host, například běžný Button nebo anchor.
- Bez podpory mask-composite zůstává statický gradientní border. Efekt je ověřený v místním Chromu, nikoli v plné matici starších prohlížečů.
- Reduced-motion, disabled a focus mají statický border; na touch běží orbit i bez hoveru. Kontrast dekorativního Dark gradient borderu není ve všech bodech 3:1; jeho roli nepřebírá focus ani vstupní hranice.
- Barvy předané spotřebitelem přes className/style mohou změnit kontrast; uvedené hodnoty platí pro výchozí AXO mapování.

Nevznikly nové závislosti, testovací framework, CI ani další komponentové varianty. Bez commitu, pushe a deploymentu.

## Soubory změněné touto opravou

- `src/design-system/styles/button-effects.css`
- `src/design-system/tokens/semantic/buttons.css`
- `src/design-system/tokens/semantic/effects.css`
- `src/design-system/tokens/semantic/gradients.css`
- `src/design-system/components/button.tsx` (pouze přechod gradient varianty, API beze změny)
- `docs/AXO_BUTTON_COLLECTION.md`
