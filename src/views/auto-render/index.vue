<template>
  <div>
    <slot></slot>
    <slot name="slotA"></slot>
    <p> 动态加载组件：</p>
    <p></p>
    <AsyncRenderView :config="myRenderConfig1" />
    <p> 全量加载组件：</p>
    <p></p>
    <RenderView :config="myRenderConfig2" />
  </div>
</template>

<script setup lang="ts">
  import AsyncRenderView from './async-render-view.vue'
  import RenderView from './render-view.vue'

  const myRenderConfig1 = [
    {
      name: 'text1',
      options: {
        text: '异步导入',
      },
    },
    {
      name: 'text2',
      options: { color: 'red' },
    },
  ]

  const myRenderConfig2 = [
    {
      name: 'text1',
      options: {
        text: '我是全量导出的组件哦',
      },
    },
    {
      name: 'text2',
      options: { color: 'blue' },
    },
  ]
</script>

<style></style>
