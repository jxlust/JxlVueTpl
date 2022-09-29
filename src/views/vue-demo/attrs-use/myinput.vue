<template>
  <input :value="text" @input="onInput" />
</template>

<script setup lang="ts">
  defineProps({
    text: String,
  });
  const emit = defineEmits(['change']);

  const onInput = (e: Event) => {
    let v = (e.target as HTMLInputElement).value;
    emit('change', v);
  };
</script>

<style></style>
