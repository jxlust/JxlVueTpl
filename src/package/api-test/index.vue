<template>
  <div class="test-item">
    <button @click="changeMsg">change</button>
    <div class="text">{{ message }} -- {{ test }}</div>
  </div>

  <div class="test-item">
    <button @click="changeMsg2">change</button>
    <div class="text">{{ myMessage }}</div>
  </div>

  <div class="test-item">
    {{ myObjOnly }}
  </div>

  <p>watch test:</p>
  <WatchTest />

  <p>model use: </p>
  <ModelUse />

  <p>my tsx one: </p>
  <MyTsxOne />

  <p>my tsx two: </p>
  <MyTsxTwo @mclick="handleMClick" title="my tsx two test" />

  <p>directive: </p>
  <DirectiveTest />

  <div class="tsx-slots">
    <p>my tsx slot1:</p>
    <TsxSlot1 />
    <p>my tsx slot2:</p>
    <TsxSlot2 />
    <p>my tsx slot3:</p>
    <TsxSlot3 />

    <p>my tsx slot4:</p>
    <TsxSlot4 />
  </div>
</template>

<script setup lang="ts">
  import { Ref } from 'vue';
  // getCurrentScope, onScopeDispose
  import WatchTest from './watch.vue';
  import ModelUse from './ModelUse.vue';
  import MyTsxOne from '../tsx-test/TsxOne';
  import MyTsxTwo from '../tsx-test/TsxTwo';
  import TsxSlot1 from '../tsx-test/TsxSlot1';
  import TsxSlot2 from '../tsx-test/TsxSlot2';
  import TsxSlot3 from '../tsx-test/TsxSlot3';
  import TsxSlot4 from '../tsx-test/TsxSlot4';
  import DirectiveTest from './DirectiveTest.vue';
  import { MyRef } from './MyRef';

  interface UserInfo {
    name?: string;
    age?: number;
  }
  let message: Ref<UserInfo> = shallowRef({
    name: 'zhang san',
  });
  let test = ref('1');
  const changeMsg = () => {
    message.value.name = 'li shi';
    // triggerRef(message)
    // message.value = { name: 'zhao tian', age: 19 };
    test.value = '100';
  };

  //custom ref use

  let myMessage = MyRef<string>('xiao zi');
  const changeMsg2 = () => {
    myMessage.value = 'zhang fei';
  };

  //reactive
  const myObj = reactive({
    count: 1,
  });
  myObj.count++;
  const myObjOnly = readonly(myObj);

  //shallowReactive 只响应式第一层
  const shallowMsg = shallowReactive({
    test: 'test',
    nav: {
      info: {
        text: 'xxxx',
      },
    },
  });
  console.log(shallowMsg);
  //toRef toRefs
  let refObj = reactive({
    foo: 1,
    bar: 2,
  });
  let { foo, bar } = toRefs(refObj);
  console.log(foo, bar);
  //toRaw 转回普通对象

  const handleMClick = (data) => {
    console.log('handler m click:', data);
  };
</script>

<style></style>
