import { LanguageProvider } from "@renderer/contexts/LanguageContext"

export const I18nProvider = ({ children }) => {
  return <LanguageProvider>
    {children}
  </LanguageProvider>
}
