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

    <button @click="handleAddColorButton">add color button</button>

    <TimerNumber />
    <SlideNumber />
    <CountDownSlider />
    <CountComponent />

    <Message4 :title="'msfour'" />

    <!--  联动 调试-->
    <SelectInput />
  </div>
</template>

<script setup lang="ts">
  import { RenderByType } from './JudgeType'
  import { useMoreEventTools } from './moreEventTools'
  import AttrsRoot from './attrs-use/root.vue'
  import { openDialog3, Message4 } from './renderTools'
  import { vOnClickOutside } from '@/hooks/core/onClickDirective'
  import { renderColorButton } from './render-api/renderButton'
  import { TimerNumber, SlideNumber, CountDownSlider, CountComponent } from './timer-number/Number'
  import { useEventListener } from '@/hooks/core/useEventListener'
  import SelectInput from './SelectInput.vue'

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
    console.log('我是副作用方法11')
  }

  //清除副作用
  const tryOnScopeDispose = (fn) => {
    console.log('current scope1111:', getCurrentScope())
    if (getCurrentScope()) {
      onScopeDispose(fn)
      return true
    }
    return false
  }

  tryOnScopeDispose(effectFunction)

  const handleAddColorButton = () => {
    renderColorButton('jxl', (data: number) => {
      console.log('color button click:', data)
    })
  }

  useEventListener('click', (e) => {
    console.error('点击事件1')
  })

  useEventListener('click', (e) => {
    console.error('点击事件2')
  })
</script>

<style></style>
