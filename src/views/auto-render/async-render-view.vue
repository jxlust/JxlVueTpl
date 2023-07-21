<template>
  <div class="async-render-view">
    <template v-for="(conf, index) in config" :key="conf.name">
      <component :is="getRenderComp(conf)" :field="conf.options" :index-of-parent-list="index" :parent-list="config">
        <template v-for="key in slotsKeys" :key="key" #[key]="gscope">
          <slot :name="key" v-bind="gscope"></slot>
        </template>
      </component>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { PropType, defineAsyncComponent, useSlots } from 'vue'
  import AsyncWidget from './widget'
  console.log('AsyncWidget:', AsyncWidget)
  type MyObj = {
    [key: string]: any
  }
  interface RenderViewConfig {
    name: string
    options: MyObj
  }
  defineProps({
    config: Array as PropType<RenderViewConfig[]>,
  })

  const getRenderComp = (conf) => {
    return defineAsyncComponent(AsyncWidget[conf.name])
  }

  const slots = useSlots()
  const slotsKeys = Object.keys(slots)
  console.log('my slots:', slots)
</script>

<style></style>
