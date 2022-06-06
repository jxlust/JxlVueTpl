<template>
  <div class="tabs">
    <div class="tab" v-for="tab in compLists" :key="tab.id" @click="tabClick(tab)">
      {{ tab.name }}
    </div>
  </div>

  <div class="tab-content">
    <keep-alive :include="['login']">
      <component :is="currentComponent" />
    </keep-alive>
  </div>

  <div class="test-content">
    <button @click="changeSlot">动态插槽</button>
    <SlotTest>
      <template #footer="{ data }">
        {{ data }}
      </template>
      <template #[slotKey]> 我是动态插入内容 </template>
    </SlotTest>
  </div>

  <div class="test-content">
    <Suspense>
      <template #default>
        <asyncComp />
      </template>
      <template #fallback>
        <div class="loading">加载中...</div>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts" setup>
  import Login from './Login.vue';
  import Register from './Register.vue';
  import ShowText from './ShowText.vue';
  import SlotTest from './SlotTest.vue';
  // import { defineAsyncComponent } from 'vue'
  interface MyComponent {
    name: string;
    comp: any;
    id: number;
  }
  type Comp = Pick<MyComponent, 'comp'>;

  const lists: MyComponent[] = [
    {
      id: 1,
      name: 'login',
      comp: markRaw(Login),
    },
    {
      id: 2,
      name: 'register',
      comp: markRaw(Register),
    },
    {
      id: 3,
      name: 'text',
      comp: markRaw(ShowText),
    },
  ];

  const compLists = ref<MyComponent[]>(lists);

  const currentComponent = ref<Comp>(lists[0].comp);

  const tabClick = (item: MyComponent) => {
    currentComponent.value = item.comp;
  };

  const slotKey = ref<string>('');
  const keyLists: string[] = ['default', 'header', 'footer'];
  const changeSlot = () => {
    let index = (Math.random() * 3) | 0;
    console.log(index);
    slotKey.value = keyLists[index];
  };

  //异步组件
  const asyncComp = defineAsyncComponent(() => import('@/package/MyTest/AsyncComponent.vue'));
</script>

<style lang="scss">
  .tabs {
    display: flex;
    align-items: center;

    .tab {
      width: 100px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid skyblue;
    }
  }

  .tab-content {
    background-color: beige;
  }

  .test-content {
    padding: 30px 0;
  }
</style>
