<template>
  <Child :value="textV" type="text" class="my-input" @change="handleChange" />
</template>

<script setup lang="ts">
  import Child from './child.vue';
  const textV = ref('');
  const handleChange = (v) => {
    textV.value = v;
  };
</script>

<style></style>
