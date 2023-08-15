/**
 * 获取小写的语言标识
 * @returns
 */
export const getLowerCaseKey = function () {
  const language = (window.navigator.language || (window.navigator as any)?.browserLanguage || 'zh-CN').toLowerCase()
  let languageKey = 'zh-cn'
  if (['zh-cn', 'zh'].includes(language)) {
    languageKey = 'zh-cn'
  } else if (language.indexOf('zh-') >= 0) {
    languageKey = 'zh-tw'
  } else if (language.indexOf('en') >= 0) {
    languageKey = 'en-us'
  }
  return languageKey
}

/**
 * 获取大小写的语言标识
 * @returns
 */
export const getLanguageKey = function () {
  const language = (window.navigator.language || (window.navigator as any).browserLanguage || 'zh-CN').toLowerCase()
  let languageKey = 'zh-CN'
  if (['zh-cn', 'zh'].includes(language)) {
    languageKey = 'zh-CN'
  } else if (language.indexOf('zh-') >= 0) {
    languageKey = 'zh-TW'
  } else if (language.indexOf('en') >= 0) {
    languageKey = 'en-US'
  }
  return languageKey
}
