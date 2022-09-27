<template>
  <div>
    Model Use:
    <button @click="dialogShow"> dialog </button>

    <div>v-model title: {{ myTitle }}</div>
    <MyDialog v-model.test="dialogVisible" v-model:title.uppercase="myTitle" />
  </div>
</template>

<script lang="ts" setup>
  import MyDialog from '@/components/dialog/index.vue';
  const dialogVisible = ref<boolean>(false);
  const myTitle = ref<string>('');
  const dialogShow = () => {
    dialogVisible.value = true;
  };
</script>

<style lang="scss" scoped></style>
