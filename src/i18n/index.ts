import { createI18n } from 'vue-i18n'
import { getLowerCaseKey } from './getLocale'
import messages from '@intlify/unplugin-vue-i18n/messages'

export function loadLanguages() {
  const modules: Record<string, any> = import.meta.glob('./languages/*.ts', {
    eager: true,
  })
  const languages: Record<string, any> = {}
  const langs = Object.keys(modules)
  for (const key of langs) {
    console.log('key:', key)
    const lang = modules[key]?.default
    const fileName = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
    languages[fileName] = lang
  }
  return languages
}

console.log(messages)
export const i18n = createI18n({
  // globalInjection: true,
  legacy: false,
  locale: getLowerCaseKey(),
  fallbackLocale: 'zh-cn',
  // use yml
  messages,
  // use ts modules
  // messages: loadLanguages(),
})
