<script setup lang="ts">
  onMounted(() => {})

  const cachedViews = ['Test']
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta?.transition as string || 'fade'">
      <keep-alive :include="cachedViews" :max="5">
        <suspense>
          <template #default>
            <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
          </template>
          <template #fallback> Loading... </template>
        </suspense>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style lang="scss"></style>
