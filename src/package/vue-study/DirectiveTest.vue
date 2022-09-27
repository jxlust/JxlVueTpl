<template>
  <div>
    <TestComp v-color:myarg.mymdf="styleData" a="123" b="456">
      <template>
        <div> 88888 </div>
      </template>
    </TestComp>

    <input type="text" v-model="color" />
    <TestComp v-color-two:myarg.mymdf="styleData2" />

    <div class="box" v-move>
      <div class="box-header"></div>
      <div class="box-container"></div>
    </div>
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
  //move

  const vMove = (el: HTMLElement) => {
    let moveElemnt = el.firstElementChild as HTMLDivElement;
    const handleMouseDown = (e: MouseEvent) => {
      console.log(e, el.offsetLeft, el.offsetTop);
      let diffX = e.clientX - el.offsetLeft;
      let diffY = e.clientY - el.offsetTop;
      const handleMouseMove = (movE: MouseEvent) => {
        el.style.top = `${movE.clientY - diffY}px`;
        el.style.left = `${movE.clientX - diffX}px`;
        let cssText = `position: absolute;top:${movE.clientY - diffY}px;left:${movE.clientX - diffX}px;`;
        el.style.cssText = cssText;
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', handleMouseMove);
        // moveElemnt.removeEventListener('mousedown',handleMouseDown)
      });
    };

    moveElemnt.addEventListener('mousedown', handleMouseDown);
  };
</script>

<style lang="scss">
  .box {
    // position: absolute;
    display: grid;
    flex-flow: column nowrap;
    width: 300px;
    &-header {
      cursor: move;
      height: 30px;
      width: 100%;
      background-color: #333;
    }
    &-container {
      height: 200px;
      background-color: skyblue;
    }
  }
</style>
