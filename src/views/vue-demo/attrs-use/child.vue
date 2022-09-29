<template>
  <Myinput v-bind="$attrs" @change="handleChange" />
</template>

<script setup lang="ts">
  import Myinput from './myinput.vue';
  const emit = defineEmits(['change']);
  const handleChange = (v) => {
    emit('change', `${v} px`);
  };
  let attrs = useAttrs();
  console.log('print root $attrs:', attrs);
</script>

<style></style>
