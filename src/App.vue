<script setup lang="ts">
  onMounted(() => {});

  const cachedViews = ['Test'];
</script>

<template>
  <header class="header">
    <h1>Hello App!</h1>
  </header>
  <p>
    <router-link to="/">Go to Home</router-link>
    <router-link to="/vueApi">Go to vueApi</router-link>
    <router-link to="/test">Go to test</router-link>
    <router-link to="/vue-demo">Vue-demo</router-link>
  </p>

  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta?.transition || 'fade'">
      <keep-alive :include="cachedViews" :max="5">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style>
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

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .header {
    height: auto;
    width: 100%;
    padding: 10px 0 30px 0;
  }
</style>
