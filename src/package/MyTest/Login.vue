<template>
  登陆
  <input v-model="userState.account" type="text" />
</template>

<script lang="ts" setup>
  interface UserInfo {
    account?: string;
    pwd?: string;
    code?: number;
  }
  const userState = reactive<UserInfo>({
    account: '',
  });
</script>

<script lang="ts">
  export default {
    name: 'Login',
  };
</script>
