<script setup lang="ts"></script>

<template>
  <div id="app">
    <h1>Hello App!</h1>
    <!-- <router-view v-slot="{ Component }">
      <transition name="van-fade">
        <component :is="Component" />
      </transition>
    </router-view> -->
    <p>
      <router-link to="/">Go to Home</router-link>
      <router-link to="/test">Go to About</router-link>
    </p>
    <router-view />
  </div>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
