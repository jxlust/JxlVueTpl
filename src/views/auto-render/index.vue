<template>
  <div>
    <div class="render-item" v-for="conf in myRenderConfig" :key="conf.name">
      <component :is="getRenderComp(conf)" />
    </div>

    <div class="render-item2" v-for="conf in myRenderConfig" :key="conf.name">
      <component :is="getRenderComp2(conf)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from 'vue'
  import AsyncWidget, { AllModules } from './widget'
  console.log('AsyncWidget:', AsyncWidget)
  console.log('AllModules:', AllModules)
  const myRenderConfig = [
    {
      name: 'text1',
      options: [],
    },
    {
      name: 'text2',
      options: [],
    },
  ]
  const getRenderComp = (conf) => {
    return defineAsyncComponent(AsyncWidget[conf.name])
  }
  const getRenderComp2 = (conf) => {
    return AllModules[conf.name]
  }
</script>

<style></style>
