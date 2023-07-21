<template>
  <div class="render-view">
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
  import { PropType, useSlots } from 'vue'
  import { AllModules } from './widget'
  console.log('AllModules:', AllModules)

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
    return AllModules[conf.name]
  }

  const slots = useSlots()
  console.log('my slots:', slots)
  const slotsKeys = Object.keys(slots)
</script>

<style></style>
