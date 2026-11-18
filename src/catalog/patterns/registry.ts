import { LoginPattern, ProfilePattern, SearchPattern, DataTablePattern, ConfirmationPattern, ValidationPattern, NavigationPattern, DashboardPattern, EmptyErrorPattern } from './PatternDemos'

export const patternRegistry = [
  { id: "login", name: "Přihlašovací formulář", description: "Validace, heslo, loading a výsledek lokálního přihlášení.", render: LoginPattern },
  { id: "profile", name: "Nastavení profilu", description: "Úprava skutečných polí a potvrzení lokálního uložení.", render: ProfilePattern },
  { id: "search", name: "Vyhledávání a filtrování", description: "Kombinace textového a stavového filtru.", render: SearchPattern },
  { id: "data-table", name: "Datová tabulka s akcemi", description: "Řazení, filtrování, výběr, sloupce, stránkování a odebrání řádku.", render: DataTablePattern },
  { id: "confirmation", name: "Potvrzovací dialog", description: "Bezpečné potvrzení a obnovení demonstračního záznamu.", render: ConfirmationPattern },
  { id: "validation", name: "Formulář s validací", description: "Propojení chybové zprávy s konkrétním polem.", render: ValidationPattern },
  { id: "navigation", name: "Navigační sestava", description: "Breadcrumbs, Tabs a Sidebar ze skutečných sdílených komponent.", render: NavigationPattern },
  { id: "dashboard", name: "Dashboardové karty", description: "Přehled s přepínáním období a kontextovými akcemi.", render: DashboardPattern },
  { id: "states", name: "Prázdné a chybové stavy", description: "Empty, error, loading, filled a skutečný přechod po opakování.", render: EmptyErrorPattern },
] as const
