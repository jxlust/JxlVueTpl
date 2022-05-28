<script lang="ts" setup>
  import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue';
  interface MyProps {
    text?: string;
    msg?: string | number | boolean;
  }

  const props = withDefaults(defineProps<MyProps>(), {
    text: '默认值',
    msg: false,
  });

  const textItemRef = ref();
  const isMore = ref(false);
  const isOver = ref(false);
  const computeElementHeight = (el: HTMLElement) => {
    console.log('el:clientHeight:', el.clientHeight);
    console.log('el:scrollHeight:', el.scrollHeight);
    if (el.clientHeight < el.scrollHeight) {
      //不全溢出行数了
      isOver.value = true;
      isMore.value = false;
      let textContent = props.text;
      console.log('textconent:', textContent);
    } else {
      //显示全了
      isOver.value = false;
      isMore.value = false;
    }
  };
  const moreSwitchClick = () => {
    if (isOver.value) {
      isMore.value = !isMore.value;
    }
  };
  onMounted(() => {
    console.log('textItemRef:', textItemRef);
    computeElementHeight(textItemRef.value);
  });
</script>

<template>
  <div class="j-textwrapper">
    <div :class="['j-textwrapper__text', { more: isMore }]" ref="textItemRef" @click="moreSwitchClick">
      {{ text }}
      <div class="operate-line" v-if="isMore">
        <el-icon>
          <ArrowUpBold color="red" />
        </el-icon>
      </div>
    </div>
    <div class="operate-fixed" v-if="isOver && !isMore">
      <span class="text-ellipsis">...</span>
      <el-icon @click="moreSwitchClick"><ArrowDownBold color="red" /> </el-icon>
    </div>
  </div>
  <div class="margin"></div>
  <el-button type="primary">Primary</el-button>
</template>

<style lang="scss">
  .j-textwrapper {
    // width: 200px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    position: relative;
    .j-textwrapper__text {
      text-align: left;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 22px;
      font-size: 14px;
      &.more {
        display: inline-block;
        text-overflow: initial;
      }
    }
    .operate-fixed {
      position: absolute;
      width: 47px;
      padding: 0 5px 0 10px;
      right: 0;
      bottom: 0;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 20%);
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
    }
    .text-ellipsis {
      display: inline-block;
    }
    .operate-line {
      display: inline-block;
      // height: 22px;
      // line-height: 22px;
      position: relative;
      top: 3px;
    }
  }
  .margin {
    margin: 20px;
  }
</style>
