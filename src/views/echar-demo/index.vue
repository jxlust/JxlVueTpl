<template>
  <div class="echar-page">
    <div class="common-width-auto work-stat-block">
      <div class="work-stat-header">
        <h2 class="title">工作统计</h2>
        <div class="time-pick-lists">
          <div class="pick-item" v-for="n in pickTypeLists" :key="n.type" @click="pickItemClick(n)">{{ n.name }}</div>
        </div>
      </div>
      <div class="work-stat-charts">
        <div class="work-stat-charts__left">
          <BarChar :data="barDatas" />
        </div>
        <div class="work-stat-charts__right">
          <PieChar title="用印平台" :colors="colorLists" :data="pieDataState.pieDataLists" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { BarValueImp, PieValueImp } from '@/hooks/useEcharts/types'
  import BarChar from './BarChart'
  import PieChar from './PieChart'

  const pickTypeLists = [
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
  type PickItemType = typeof pickTypeLists[number]

  const curPickTime = ref<string>(pickTypeLists[0].type)

  const pickItemClick = (item: PickItemType) => {
    curPickTime.value = item.type
    let test: any = []
    for (let i = 0; i < 6; ++i) {
      test.push((Math.random() * 200) | 0)
    }
    barDatas.values = test

    let pie_test: any = []
    for (let i = 0; i < 5; ++i) {
      pie_test.push({
        name: '电子展' + i,
        value: (Math.random() * 200) | 0,
      })
    }
    pieDataState.pieDataLists = pie_test
  }

  const barDatas = reactive<BarValueImp>({
    labels: [
      '待核对电子用印',
      '待核对实体用印',
      '待系统电子用印',
      '已核对电子用印',
      '已核对实体用印',
      '已系统电子用印',
    ],
    values: [10, 23, 33, 1, 123, 99],
  })

  const colorLists = ['#4F6CFF', '#00DDD1', '#33A9F1', '#986BFE', '#A8CBFF']
  const pieDataState = reactive<{
    pieDataLists: PieValueImp[]
  }>({
    pieDataLists: [],
  })

  pieDataState.pieDataLists = [
    { value: 1048, name: '机要核对电子章' },
    { value: 735, name: '非机要核对电子章' },
    { value: 580, name: '机要核对实体章' },
    { value: 484, name: '通用流程' },
    { value: 300, name: '纸质签批' },
  ]
</script>

<style lang="scss">
  .echar-page {
    padding-top: 20px;
    width: 100%;
    height: auto;
    background-color: #f8f8f8;
    display: flex;
    align-items: center;
    justify-content: center;
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
      height: 500px;
      &__left {
        width: 50vw;
        height: 100%;
      }
      &__right {
        width: 50vw;
        height: 100%;
      }
    }
  }

  .my-barchart {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .my-piechart {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
