<template>
  <div>
    <button @click="handleClick">全屏</button>

    <div class="table">
      <div class="table-item" v-for="n in 20" :key="n"> 数据 ---- {{ n }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 实现全屏的方法
  const requestFullScreen = (element) => {
    const requestMethod =
      element.requestFullScreen || //W3C
      element.webkitRequestFullScreen || //Chrome
      element.mozRequestFullScreen || //FireFox
      element.msRequestFullScreen //IE11
    if (requestMethod) {
      requestMethod.call(element)
    } else if (typeof window.ActiveXObject !== 'undefined') {
      //for Internet Explorer
      let wscript = new ActiveXObject('WScript.Shell')
      if (wscript !== null) {
        wscript.SendKeys('{F11}')
      }
    }
  }

  //退出全屏 这里没有用到 ，esc键和F11可以直接退出，
  // const exitFull = () => {
  //   // 判断各种浏览器，找到正确的方法
  //   const exitMethod =
  //     document.exitFullscreen || //W3C
  //     (document as any)?.mozCancelFullScreen || //FireFox
  //     (document as any)?.webkitExitFullscreen || //Chrome等
  //     (document as any)?.webkitExitFullscreen //IE11
  //   if (exitMethod) {
  //     exitMethod.call(document)
  //   } else if (typeof window.ActiveXObject !== 'undefined') {
  //     //for Internet Explorer
  //     let wscript = new ActiveXObject('WScript.Shell')
  //     if (wscript !== null) {
  //       wscript.SendKeys('{F11}')
  //     }
  //   }
  // }

  const handleClick = () => {
    requestFullScreen(document.documentElement)
  }
</script>

<style lang="scss">
  .table {
    &-item {
      height: 30px;
      width: 100%;
    }
  }
</style>
