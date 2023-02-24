<script setup lang="ts">
  onMounted(() => {})

  const cachedViews = ['Test']
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta?.transition as string || 'fade'">
      <keep-alive :include="cachedViews" :max="5">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>

  <router-link to="/a">a</router-link>
  <router-link to="/aa">aa</router-link>
</template>

<style lang="scss"></style>
