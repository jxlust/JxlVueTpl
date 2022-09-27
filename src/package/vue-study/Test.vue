<template>
  <div>
    Test Component
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
  import { useAttrs, useSlots } from 'vue';
  const attrs = useAttrs(); // 获取所有传入的Attributes参数,数据有点多，一般不会这样直接用
  const slots = useSlots(); // 获取所有插槽
  // slots.default
  // slots.footer

  console.log('attrs:', attrs);
  console.log('slots:', slots);
</script>

<style></style>
