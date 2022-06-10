<script setup lang="ts"></script>

<template>
  <header class="header">
    <h1>Hello App!</h1>
  </header>
  <router-view v-slot="{ Component }">
    <transition name="van-fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
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
