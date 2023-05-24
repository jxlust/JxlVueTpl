<template>
  <div class="echar-page">
    <div class="common-width-auto work-stat-block">
      <div class="work-stat-header">
        <h2 class="title">工作统计</h2>
        <div class="time-pick-lists">
          <div class="pick-item" v-for="n in typeLists" :key="n.type">{{ n.name }}</div>
        </div>
      </div>
      <div class="work-stat-charts">
        <div class="work-stat-charts__left">
          <BarChar />
        </div>
        <div class="work-stat-charts__right">
          <PieChar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BarChar from './bar.vue'
  import PieChar from './pie.vue'

  const typeLists = [
    {
      name: '本周',
      type: 'weeks',
    },
    {
      name: '近一个月',
      type: 'last-month',
    },
    {
      name: '近三个月',
      type: 'three-months',
    },
  ]
</script>

<style scoped lang="scss">
  .echar-page {
    padding-top: 20px;
    width: 100%;
    height: auto;
    background-color: #f8f8f8;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bar-demo {
    height: 260px;
  }
  .pie-demo {
    height: 260px;
    text-align: left;
  }
  .common-width-auto {
    width: 77.3vw;
    min-width: 1056px;
  }
  .work-stat {
    &-block {
      background: #ffffff;
      box-shadow: 0 8px 20px 0 rgba(3, 0, 77, 0.05);
      border-radius: 8px;
      padding: 24px;
    }
    &-header {
      text-align: left;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #020f22;
        letter-spacing: 0;
        line-height: 20px;
        font-weight: 500;
      }
      .time-pick-lists {
        display: flex;
        align-items: center;
      }
      .pick-item {
        border-right: 1xp solid;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #657088;
        letter-spacing: 0;
        line-height: 18px;
        font-weight: 400;
      }
    }
    &-charts {
      display: flex;
      align-items: center;
    }
  }
</style>
