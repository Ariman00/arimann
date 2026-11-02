import type { i18n } from 'i18next'

export const changeLanguage = (i18n: i18n, lang: string) => {
  void i18n.changeLanguage(lang)
}