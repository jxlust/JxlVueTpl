<script setup lang="ts">
  // import '../lib/my-packages.umd.cjs'

  import { Button, reactCommonRender, Text } from '../lib/my-packages.js'
  import '../lib/style.css'
  const demoRef = ref<any>(null)
  onMounted(() => {
    console.log('ref:', demoRef.value)
    const child = Text({ text: '我是个花里胡哨的字' })
    const demoNode = Button({ level: '第一条：', children: child })
    reactCommonRender(demoRef.value, demoNode)
  })

  // 注意一定要更name一致
  const cachedViews = ['Test']
  // const ab = ref(false);
</script>

<template>
  <div ref="demoRef"></div>
  <header class="header">
    <h1>Hello App!</h1>
  </header>
  <nav class="nav-block">
    <router-link to="/">Go to Home</router-link>
    <router-link to="/vue-api">Go to vueApi</router-link>
    <router-link to="/pager-over">pager-over</router-link>
    <router-link to="/some-comp">some-component</router-link>
    <router-link to="/test">Go to test</router-link>
    <router-link to="/vue-demo">Vue-demo</router-link>
    <router-link to="/water-wall">water wall</router-link>
    <router-link to="/pager-scroll">pager scroll</router-link>
  </nav>

  <div class="view-container">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta?.transition as string || 'fade'" mode="default">
        <keep-alive :include="cachedViews" :max="5">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss">
  #testIframe {
    position: fixed;
    inset: 0;
    z-index: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60vw;
    height: 60vh;
  }

  .header {
    height: 44px;
    width: 100%;
  }
  .nav-block {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 10px;

    > a {
      color: skyblue;
    }
  }
  .view-container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    flex-grow: 1;
    min-height: 0;
  }
</style>
