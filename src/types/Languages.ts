export const languages = ['ru', 'kk', 'en'] as const

export type Languages = (typeof languages)[number]

export const isLanguage = (value: string): value is Languages =>
  (languages as readonly string[]).includes(value)