<template>
  <div class="water-test">
    <div class="water-wall">
      <div class="water-wall-left">
        <div class="goods-item" v-for="n in leftGoods" :key="n.id">
          <img class="goods-item-img" :src="n.url" alt="" />
          <div class="goods-item-title">
            {{ n.title }}
          </div>
          <div class="goods-item-desc">
            {{ n.desc }}
          </div>
        </div>
      </div>

      <div class="water-wall-right">
        <div class="goods-item" v-for="n in rightGoods" :key="n.id">
          <img class="goods-item-img" :src="n.url" alt="" />
          <div class="goods-item-title">
            {{ n.title }}
          </div>
          <div class="goods-item-desc">
            {{ n.desc }}
          </div>
        </div>
      </div>
    </div>
    <div class="scroller-footer" ref="footerTarget">loading...</div>
  </div>
</template>

<script setup lang="ts">
  import { randomInteger } from '@/utils'
  import { nanoid } from 'nanoid'
  import { useIntersectionObserver } from '@vueuse/core'

  const textLists = [
    '四六级案例三等奖速度快例三等奖速度快发，阿十大减肥啦就，了实际发',
    '受打击了',
    '丝路精神的，受打击了',
    '三六九等发，送积分啦aalsdj,i welisdf jyoujls三六九等发，送积分啦aalsdjjasjdlfja上了假发，时代峰峻阿拉斯加发',
  ]
  const imgHost = 'https://fastly.jsdelivr.net/npm/@jxlust/assets/img/'

  const leftGoods = reactive<any>([])
  const rightGoods = reactive<any>([])

  const pager = {
    current: 1,
    size: 10,
  }
  const mockData = () => {
    return new Promise<unknown[]>((resolve) => {
      setTimeout(() => {
        let start = (pager.current - 1) * pager.size
        let end = pager.current * pager.size
        let result: any = []
        for (let i = start; i < end; ++i) {
          let bgIndex = randomInteger(10) + 1
          let randIndex = randomInteger(4)
          result.push({
            id: nanoid(),
            index: `${i + 1}`,
            title: `标题${i + 1}`,
            desc: textLists[randIndex],
            url: `${imgHost}bg${bgIndex}.webp`,
          })
        }
        resolve(result)
      }, 500)
    })
  }
  const loadData = async () => {
    let result = await mockData()
    // let half = result.length >> 1;
    for (let i = 0, len = result.length; i < len; ++i) {
      let item = result[i]
      if (i % 2 === 0) {
        leftGoods.push(item)
      } else {
        rightGoods.push(item)
      }
    }
    // leftGoods.push(...result.slice(0, half))
    // rightGoods.push(...result.slice(half))
    pager.current++
  }

  const footerTarget = ref()
  const { stop } = useIntersectionObserver(footerTarget, ([{ isIntersecting }], _) => {
    console.log('是否滑动到底部...', isIntersecting)
    if (isIntersecting) {
      loadData()
    }
  })
  onMounted(() => {})
  onUnmounted(() => {
    stop()
  })
  loadData()
</script>

<style lang="scss">
  .water-test {
    position: relative;
    width: 100%;
  }
  .water-wall {
    display: flex;
    align-items: stretch;
    column-gap: 10px;
    &-left {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    }
    &-right {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    }
  }
  .goods-item {
    display: flex;
    flex-direction: column;
    &-img {
      max-width: 100%;
      max-height: 200px;
      object-fit: cover;
    }
    &-title {
      font-size: 16px;
      font-weight: bold;
    }
    &-desc {
      font-size: 14px;
      color: #999;
      text-align: left;
    }
  }

  .scroller-footer {
    height: 20px;
    width: 100%;
    background-color: gold;
  }
</style>
