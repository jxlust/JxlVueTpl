export const extend = Object.assign

export function escapeSpecialCharacter(str: string) {
  /* eslint-disable */
  const pattern = /[`~!@#_$%^&*()+=|{}':;',\\\[\\\].<>/?~！@#￥……&*（）——{}【】‘；：”“'。，、？\s]/g
  return str.replace(pattern, (match) => '\\' + match)
}

export const SearchReplaceString = '<span style="color: #F63433;">$1</span>'
export const regExpReplaceText = (query: any, name: any, replaceStr: string) => {
  if (query && query.trim().length && name) {
    //区分大小写，不区分就i匹配
    // console.log('q:', query);
    let replaceReg = new RegExp(`(${query})`, 'ig')
    // console.log('r:', replaceReg);
    return name.replace(replaceReg, replaceStr)
  } else {
    return name
  }
}
/**
 * 高亮匹配搜索关键字
 * @param content
 * @param keywords string
 * @returns 替换后的结果
 */
export const regSearchHtmlContent = (content: any, keywords: string) => {
  if (keywords) {
    // 过滤字符
    keywords = escapeSpecialCharacter(keywords)
    return regExpReplaceText(keywords, content, SearchReplaceString)
  } else {
    return content
  }
}
/**
 * 通过分词集合高亮匹配搜索关键字
 * @param content
 * @param keywords string[]
 * @returns 替换后的结果
 */
export const regSearchHtmlContentByList = (content: any, keywords?: string[]) => {
  if (keywords && keywords.length > 0) {
    // 过滤特殊字符
    const eacapeKeywords = keywords.map((item) => escapeSpecialCharacter(item))
    let regString = eacapeKeywords.join('|')
    return regExpReplaceText(regString, content, SearchReplaceString)
  } else {
    return content
  }
}

export const randomInteger = (max: number) => {
  return (Math.random() * max) | 0
}

/**
 * 动态获取资源url
 * @param url
 * @returns
 */
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/${url}`, import.meta.url).href
}

export const IsMobileClient = () => {
  return navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  )
}

export function replaceSymbols(str: string) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export const filterHashSelfUrl = (url: string) => {
  // const HostMap = ['ido.sit.sf-express.com', 'ido.sf-express.com', 'ask.sit.sf-express.com', 'ask.sf-express.com'];
  const currentHost = true
  try {
    const urlObj = new URL(url)
    if (currentHost && urlObj.hash) {
      // 自己域名下且有hash值,去掉hash
      return url.replace('/#/', '/')
    } else {
      return url
    }
  } catch (_) {
    return url
  }
}
