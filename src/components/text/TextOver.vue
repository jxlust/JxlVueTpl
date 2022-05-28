<script lang="ts" setup>
  import { ElButton } from 'element-plus';

  interface MyProps {
    text?: string;
    msg?: string | number | boolean;
  }
  withDefaults(defineProps<MyProps>(), {
    text: '默认值',
    msg: false,
  });
</script>

<template>
  <div class="j-text-over">
    <div class="text-over__item">
      {{ text }}
      <i></i>
    </div>
    <el-button type="primary">Primary</el-button>
  </div>
</template>

<style lang="scss">
  .j-text-over {
    .text-over__item {
    }
  }
</style>
