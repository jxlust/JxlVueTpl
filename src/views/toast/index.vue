<template>
  <div class="test">
    <JToast v-model:show="show1" message="hhhhhhhh" />
    <button @click="click1">test1 show</button>

    <button @click="click2">test2 show</button>
    <button @click="click3">test3 show</button>

    <button @click="setMultiple"> {{ isMultiple ? '单实例' : '多实例' }}</button>
  </div>
</template>

<script setup lang="ts">
  import 'vant/lib/index.css'
  import JToast from '@/components/j-toast/JToast'
  import { Toast } from '@/components/j-toast/JToastFunction'
  // import { Toast } from 'vant'
  const show1 = ref(false)
  const isMultiple = ref(false)
  const click1 = () => {
    show1.value = true
  }

  const click2 = () => {
    Toast({
      message: 'jsldfjaldfjalsj',
    })
  }

  const click3 = () => {
    let t3 = Toast({
      message: '333333333劳斯莱斯',
    })
    console.log('t3:', t3)
    setTimeout(() => {
      t3.clear()
    }, 500)
    // t3.message = 'update33333mls脸上的肌肤'
  }

  const setMultiple = () => {
    isMultiple.value = !isMultiple.value
    Toast.allowMultiple(isMultiple.value)
  }
</script>

<style lang="scss"></style>
