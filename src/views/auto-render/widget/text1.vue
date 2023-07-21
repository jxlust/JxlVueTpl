<template>
  <span>{{ showText }}</span>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  const props = defineProps({
    field: Object,
    indexOfParentList: {
      type: Number,
      required: true,
    },
    parentList: Array,
  })
  const text = ref('hhh')

  const showText = computed(() => {
    return props.field?.text + '' + text.value
  })
</script>

<style></style>
