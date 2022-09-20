<script setup lang="ts">
  // keep alive cached views
  const cachedViews: string[] = ["Test"];

  const initAppData = () => {};

  onMounted(() => {});

  initAppData();
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta?.transition || 'van-fade'">
      <keep-alive :include="cachedViews" :max="5">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>

  <router-link to="/test">test</router-link>
  <router-link to="/home">home</router-link>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
