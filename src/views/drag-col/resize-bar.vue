<template>
  <span ref="target" class="my-resizer" :class="{ 'my-resizer-draging': isDraging }">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
  import Gesto from 'gesto'
  import { defineEmits, ref } from 'vue'

  const target = ref<HTMLSpanElement>()
  const isDraging = ref(false)

  const emit = defineEmits(['change'])
  let gesto: Gesto

  onMounted(() => {
    if (target.value) {
      gesto = new Gesto(target.value, {
        container: window,
        pinchOutside: true,
      })
        .on('drag', (e) => {
          console.log('drag e:', e)
          emit('change', e.deltaX)
        })
        .on('dragStart', () => {
          isDraging.value = true
        })
        .on('dragEnd', () => {
          isDraging.value = false
        })
        .on('pinchStart', () => {
          // e.datas.scale = scale;
        })
        .on('pinch', (e) => {
          console.log('pinch:', e)
          // scale = e.datas.scale * e.scale;
          // target.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
        })
    }
  })

  onUnmounted(() => {
    // remove event
    gesto.unset()
  })
</script>

<style lang="scss">
  .my-resizer {
    width: 20px;
    height: 100vh;
    background-color: skyblue;
    &-draging {
    }
  }
</style>
