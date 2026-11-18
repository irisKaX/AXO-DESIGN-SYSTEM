# Sdílené komponenty

Oficiální shadcn/ui zdroje mají jednu implementaci v tomto adresáři. Veřejné exporty
jsou v `../index.ts`; katalog a Playground je používají přes tento vstup.

`action-addons.tsx`, `form-addons.tsx` a `layout.tsx` jsou malé znovupoužitelné
kompozice existujících základů. Nekopírují jejich vizuální ani interakční implementaci.
Data Table je samostatně označený vzor v `../patterns/`.

Dokumentace a demonstrační stav patří do `src/catalog/`, nikdy opačně.
