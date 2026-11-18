# Dokumentace komponent

`ComponentDocumentation` v `types.ts` popisuje kategorii, původ, skutečnou ukázku,
varianty, velikosti, relevantní stavy, hlavní props, pravidla použití, přístupnost
a React ukázku. `../registry.ts` obsahuje 61 položek a společnou dokumentační politiku.

Přehledy a detaily generuje `../pages/ComponentsPage.tsx`. `DemoControls` sdílí
katalog a Playground. Ovládání stavu předává reálné props skutečným komponentám;
hover a focus se ukazují skutečnou interakcí. Motiv náhledu mění AXO ThemeProvider,
aby stejně reagovaly i portály.

Metadata nejsou automatický opis všech DOM atributů. Přehled pokrývá hlavní API;
úplné typy jsou odvozené z exportovaných komponent. Ukázky s callbackem (save,
setDate apod.) předpokládají jeho definici v hostitelské aplikaci.
