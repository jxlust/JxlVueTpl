<template>
  <div class="mock">
    <div class="mock-get-test">
      <div class="item" v-for="item in getTestList" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import request from '@/utils/http/request';

  const getTestData = async () => {
    let ret = await request({
      url: '/test/getData',
      method: 'get',
      data: 'test',
    });
    console.log('ret:', ret);
  };

  const state = reactive({
    getTestList: [],
  });
  const { getTestList } = toRefs(state);

  getTestData();
</script>

<style></style>
