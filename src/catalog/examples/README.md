# Živé příklady

Čtyři tematické moduly implementují demonstrační chování všech 61 detailů.
Každý importuje skutečné sdílené komponenty přes `src/design-system/index.ts`.

`DemoOptions` reprezentuje variantu, velikost a pouze relevantní přepínače stavu.
Změna konfigurace restartuje ukázku; následné interakce uvnitř ukázky jsou skutečné.
Stejné ukázky bez kopírování používá Playground. Data jsou pouze lokální.
