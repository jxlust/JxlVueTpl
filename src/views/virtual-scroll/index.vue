<template>
  <div>
    <FixedSizeScroll :width="300" :height="300" :item-size="50" :item-count="100">
      <template #defalut="data">
        <span class="item">{{ data.index }}</span>
      </template>
    </FixedSizeScroll>
  </div>
</template>

<script setup lang="ts">
  import FixedSizeScroll from './FixedSizeScroll'
</script>

<style></style>
