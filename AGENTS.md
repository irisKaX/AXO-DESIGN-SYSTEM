## Role projektu

- AXO-DESIGN-SYSTEM je samostatný, modulární a znovupoužitelný design systém.
- Nejedná se o aplikaci Axolotl ani o pokračování starého projektu Axo-App.
- Cílem je vytvářet skutečné propojené UI komponenty, nikoliv pouze vizuální ukázky.

## Spolupráce

- ChatGPT připravuje UX/UI návrhy, architekturu a zadání.
- Codex implementuje schválené změny.
- Uživatelka rozhoduje o výsledném designu a schvaluje změny.
- Neprováděj nevyžádané změny ani kreativní redesign.

## Architektura

- React + TypeScript + Vite.
- Komponenty musí být znovupoužitelné a nezávislé na katalogu.
- Katalog používá skutečné komponenty, nikoliv jejich kopie.
- Design tokeny jsou centrálním zdrojem hodnot.
- Podporuj Dark Mode a Light Mode.
- Preferuj čisté CSS bez duplicitních pravidel a zbytečných přepisů.
- Dodržuj přístupnost a responzivitu.

## Pravidla vývoje

- Prováděj pouze výslovně zadané změny.
- Neměň nesouvisející komponenty.
- Nepřidávej zbytečné knihovny a závislosti.
- Nevytvářej testy, CI/CD workflow, backend ani deployment bez výslovného zadání.
- Nespouštěj automaticky rozsáhlé testy nebo buildy.
- Neprováděj commit ani push bez výslovného souhlasu.
- Zachovávej funkční lokální náhled s automatickou aktualizací přes Vite HMR.
- Nevytvářej duplicitní implementace komponent.

## Po dokončení úkolu

- Stručně shrň provedené změny.
- Vypiš upravené soubory.
- Upozorni na případné problémy.
- Nepokračuj automaticky dalšími úkoly.
