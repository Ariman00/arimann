import i18n from '@/i18n'

const getLocale = () => i18n.language.slice(0, 2)

export default getLocale