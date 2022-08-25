<template>
  <div>
    <TestComp v-color:myarg.mymdf="styleData" />

    <input type="text" v-model="color" />
    <TestComp v-color-two:myarg.mymdf="styleData2" />
  </div>
</template>

<script setup lang="ts">
  import { Directive, DirectiveBinding } from 'vue';
  import TestComp from './Test.vue';
  type StyleType = {
    background: string;
  };
  const color = ref('');
  const styleData = {
    background: 'red',
  };
  const styleData2 = reactive({
    background: color,
  });

  const vColor: Directive = {
    created() {
      console.log('----> created');
    },
    beforeMount(...args) {
      console.log('----> beforeMount');
      console.log('directive args:', args);
      //el: HTMLElement, dir: DirectiveBinding<StyleType>, node, preNode
    },
    mounted(el: HTMLElement, dir: DirectiveBinding<StyleType>) {
      console.log('----> mounted');
      el.style.background = dir.value.background;
    },
    beforeUpdate() {
      console.log('----> beforeUpdate');
    },
    //binding value 更新触发，比如这里styleData里的值background改变
    updated() {
      console.log('----> updated');
    },
    // v-if 等导致卸载触发
    beforeUnmount() {
      console.log('----> beforeUnmount');
    },
    unmounted() {
      console.log('----> unmounted');
    },
  };

  //简写，只在updated mounted 触发相同行为，可以使用简写
  const vColorTwo = (el: HTMLElement, dir: DirectiveBinding<StyleType>) => {
    el.style.background = dir.value.background;
  };
</script>

<style></style>
