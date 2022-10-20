<template>
  <div>
    <h1>Vue Demo</h1>

    <button @click="handleRenderUse"> render use </button>
    <RenderByType :type="type" v-on-click-outside="handlerTest2" />

    <div style="margin-top: 30px">
      <template v-for="tool in tools" :key="tool.title">
        <button @click="tool.onClick">{{ tool.title }}</button>
        <component :is="tool.comp" />
      </template>
    </div>

    <AttrsRoot />

    <div class="test" v-on-click-outside.bubble="handlerTest"> directive-test </div>

    <!-- <Suspense>
      <template #default>
        <StringComp />
      </template>
      <template #fallback>
        <div class="loading">加载中...</div>
      </template>
    </Suspense> -->

    <!-- <MyButton :text="'s'"></MyButton> -->
  </div>
</template>

<script setup lang="ts">
  import { RenderByType } from './JudgeType'
  import { useMoreEventTools } from './moreEventTools'
  import AttrsRoot from './attrs-use/root.vue'
  import { openDialog3 } from './renderTools'
  import { vOnClickOutside } from '@/hooks/core/onClickDirective'

  const number = ref(100)
  const StringComp = defineAsyncComponent<any>(
    () =>
      new Promise((resolve, _) => {
        resolve({
          data: () => {
            return {
              a: 100,
            }
          },
          template: `<div>I am async!${number}</div>`,
        })
      }),
  )

  console.log(1, StringComp)
  const type = ref(1)

  const tools = useMoreEventTools()

  const handleRenderUse = () => {
    type.value = Math.random() < 0.5 ? 1 : 0
    openDialog3()
  }

  const handlerTest = (e) => {
    console.log('directive-test:', e)
    number.value++
  }
  const handlerTest2 = () => {
    // console.log("22:", e);
  }

  const effectFunction = () => {
    console.log('我是副作用方法')
  }

  //清除副作用
  const tryOnScopeDispose = (fn) => {
    console.log('current scope:', getCurrentScope())
    if (getCurrentScope()) {
      onScopeDispose(fn)
      return true
    }
    return false
  }

  tryOnScopeDispose(effectFunction)
</script>

<style></style>
