<template>
  <div class="grand-son">
    <div class="grand-son-header">
      <slot name="header" v-bind="grandObj"></slot>
    </div>
    <slot>A</slot>

    <div class="grand-son-footer">
      <slot name="footer" :gdata="grandData"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 我是后代孙子组件
  // 我是来自孙子组件的数据，通过插槽绑定值传递过去
  const grandData = ref('grand data.')
  const grandObj = reactive({
    id: 1,
  })
</script>

<style lang="scss">
  .grand-son {
    &-header {
      background-color: bisque;
      height: 30px;
      width: 100%;
    }
    &-footer {
      width: 100%;
      height: 10px;
      background-color: skyblue;
    }
  }
</style>
