# Sestavy Playgroundu

Playground drží seznam položek, jejich pořadí a DemoOptions pouze v paměti.
Používá komponentový registr a sdílené DemoControls z katalogu; knihovna na nich
nezávisí. Předpřipravené sestavy pocházejí z jediného registru `catalog/patterns/registry.ts`.

V1 umožňuje přidání, odebrání, řazení a nastavení položek, přepnutí motivu
a kopírování konfigurace. Nejde o drag & drop editor ani generátor aplikací.
