<template>
  <div class="water-test">
    <WaterBox>
      <WaterItem v-for="item in lists" :url="item" :key="item" />
    </WaterBox>
  </div>
</template>

<script setup lang="ts">
  import WaterBox from './components/WaterBox'
  import WaterItem from './components/WaterItem'
  const imgHost = 'https://fastly.jsdelivr.net/npm/@jxlust/assets/img/'
  // bg1.webp
  const lists = reactive<any[]>([])
  const textLists = ['四六级案例三等奖速度快例三等奖速度快发，阿十大减肥啦就，了实际发','受打击了'];
  for (let i = 1; i < 10; i++) {
    let index = Math.random() < 0.5 ? 0: 1;
    lists.push({
      url: `${imgHost}bg${i}.webp`,
      text: `${i}${textLists[index]}`
    })
  }
</script>

<style lang="scss">
  .water-test {
    position: relative;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
</style>
