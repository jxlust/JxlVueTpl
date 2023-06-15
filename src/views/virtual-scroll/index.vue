<template>
  <div class="virtual-scroll">
    <SvgIcon class-name="test1" icon="http://localhost:8080/src/assets/svg/eye-open.svg" />
    <SvgIcon class-name="test2" icon="eye" />

    <img :src="img" alt="" />
    <!-- <FixedSizeScroll :width="300" :height="300" :item-size="50" :item-count="100">
      <template #default="{ item, index }">
        <span class="item">{{ item }} --- {{ index }}</span>
      </template>
    </FixedSizeScroll> -->
    <FixedSizeScroll :width="300" :height="300" :item-size="50" :item-count="100" :item="Item" />
  </div>
</template>

<script setup lang="ts">
  import FixedSizeScroll from './FixedSizeScroll2'
  import Item from './item'
  import SvgIcon from '@/components/svg-icon/SvgIcon'
  import img from '@/assets/svg/eye-open.svg'
</script>

<style lang="scss">
  .virtual-scroll {
    position: relative;
    padding: 20px;
  }
  .scroll-container {
    background-color: skyblue;
  }
  .scroll-content {
    display: flex;
    flex-direction: column;
  }
  .my-item {
    display: block;
    height: 50px;
    &:nth-child(2n) {
      background-color: bisque;
    }
    &:nth-child(2n + 1) {
      background-color: antiquewhite;
    }
  }
</style>
