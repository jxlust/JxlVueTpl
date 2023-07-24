<template>
  <div>
    <p>test 1</p>
    <template v-for="n in compList" :key="n">
      <component :is="n" />
    </template>
  </div>
</template>

<script setup lang="ts">
  // const myShowComp = 'JxlButton';
  const compList = ['JxlButton', 'JxlImage']
</script>

<style></style>
