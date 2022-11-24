//判断是否支持 比如浏览器开启了隐私模式
export const isCookie = () => {
  return navigator.cookieEnabled
}
//存储
export function setCookie(cname: string, cvalue: string, exdays = 0) {
  cvalue = encodeURIComponent(JSON.stringify(cvalue))
  if (exdays > 0) {
    const d = new Date().getTime() + exdays * 24 * 3600 * 1000 + 8 * 3600 * 1000
    const expires = 'expires=' + new Date(d).toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  } else {
    document.cookie = cname + '=' + cvalue + ';' + ';path=/'
  }
}
//获取
export function getCookie(cname: string) {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      const d = c.substring(name.length, c.length)
      let jsonD
      try {
        jsonD = !!d ? JSON.parse(decodeURIComponent(d)) : ''
      } catch (error) {
        console.error('json decode error:', error)
      }

      return jsonD
    }
  }
  return ''
}
//获取 通过正则
// function getCookie(name) {
//   var arr,
//     reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//   if ((arr = document.cookie.match(reg))) {
//     return JSON.parse(decodeURIComponent(arr[2]));
//   } else {
//     return null;
//   }
// }
//删除
export function deleteCookie(name: string) {
  const date = new Date()
  date.setTime(date.getTime() - 1)
  const delValue = getCookie(name)
  if (delValue) {
    document.cookie = name + '=' + delValue + ';expires=' + date.toUTCString()
  }
}
