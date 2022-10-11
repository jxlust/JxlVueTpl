<template>

  <div class="water-test">
    <WaterBox @first-end="handleFirstLoadEnd">
      <WaterItem v-for="item in lists" :url="item.url" :key="item.id" :id="item.id" :text="item.text">
      </WaterItem>
    </WaterBox>
    <div class="scroller-footer" ref="footerTarget">loading...</div>
  </div>

</template>
  
<script setup lang='ts'>
import { useIntersectionObserver } from '@vueuse/core'
import { nanoid } from 'nanoid'

import WaterBox from './components/WaterBox';
import WaterItem from './components/WaterItem';
const imgHost = 'https://fastly.jsdelivr.net/npm/@jxlust/assets/img/';
// bg1.webp
const lists = reactive<any[]>([])
const footerTarget = ref();
const textLists = ['四六级案例三等奖速度快例三等奖速度快发，阿十大减肥啦就，了实际发', '受打击了', '丝路精神的，受打击了'];

for (let i = 0; i < 11; i++) {
  let index = Math.random() * 3 | 0;
  let bgIndex = i % 10 + 1;
  lists.push({
    id: nanoid(),
    url: `${imgHost}bg${bgIndex}.webp`,
    text: `${i}${textLists[index]}`
  })
}

onMounted(() => {

})

let stop;
const handleFirstLoadEnd = () => {
  stop = useIntersectionObserver(
    footerTarget,
    ([{ isIntersecting }], observerElement) => {
      console.log('是否滑动到底部...', isIntersecting);
      if (isIntersecting) {
        loadMoreData();
      }
    },
  ).stop
}


const loadMoreData = () => {
  // window.document.body.style.cssText = 'overflow:hidden;'
  let result: any = [];
  for (let i = 0; i < 11; i++) {
    let index = Math.random() * 3 | 0;
    let bgIndex = i % 10 + 1;
    result.push({
      id: nanoid(),
      url: `${imgHost}bg${bgIndex}.webp`,
      text: `${i}${textLists[index]}`
    })
  }
  lists.push(...result);

}



onUnmounted(() => {
  stop?.();
})
</script>
  
<style lang="scss">
.water-test {
  position: relative;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.scroller-footer {
  height: 20px;
  width: 100%;
  background-color: gold;
}
</style>
