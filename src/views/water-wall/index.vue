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
  const lists = reactive<string[]>([])

  for (let i = 1; i < 11; i++) {
    lists.push(`${imgHost}bg${i}.webp`)
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
