export const extend = Object.assign

export function escapeSpecialCharacter(str: string) {
  const pattern = /[`~!@#_$%^&*()=|{}':;',\\\[\\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？\s]/g
  return str.replace(pattern, (match) => '\\' + match)
}

export const regExpSearchName = (query: any, name: any, replaceStr: string) => {
  if (query && query.trim().length && name) {
    //区分大小写，不区分就i匹配
    query = escapeSpecialCharacter(query)
    const replaceReg = new RegExp(`(${query})`, 'ig')
    return name.replace(replaceReg, replaceStr)
  } else {
    return name
  }
}

export const randomInteger = (max: number) => {
  return (Math.random() * max) | 0
}
