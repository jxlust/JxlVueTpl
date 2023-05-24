import { useDebounceFn } from '@vueuse/core'
import { defineAsyncComponent, defineComponent } from 'vue'
import './index.scss'

const LoadingComponent = () => <div>loading... </div>
const ErrorComponent = () => <div>oh no! error error </div>
export const unknownProp = null as unknown as PropType<unknown>

const ScrollFixed = defineComponent({
  name: 'ScrollFixed',
  props: {
    data: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const tabs = [
      {
        text: '标签A',
        key: 'A',
      },
      {
        text: '标签B',
        key: 'B',
      },
      {
        text: '标签C',
        key: 'C',
      },
    ]
    const curTab = ref('')
    curTab.value = tabs[0].key

    const sections = ref<HTMLElement[]>([])
    const saveH3dom = (el) => {
      el && !sections.value.includes(el) && sections.value.push(el)
    }
    const onItemClick = (item) => {
      curTab.value = item.key

      //触发detail的滚动
      const dom = document.getElementById(`detail${item.key}`) as HTMLElement
      dom.scrollIntoView({ behavior: 'smooth' })
    }
    const sectionArray = computed(() => {
      return sections.value?.length > 0 ? sections.value?.map((item) => item.offsetTop - item.offsetHeight / 2) : []
    })
    const onScroll = (e: Event) => {
      const target = e.target as HTMLElement
      console.log(target)
      const scrollTop = target?.scrollTop || 0
      // const sections =
      console.log(1, sectionArray.value)
      console.log(2, scrollTop, sectionArray.value[2])
      //scrollTop < array[1] -> A
      //scrollTop < array[2] -> B
      //else -> C
      if (sectionArray.value?.length > 0) {
        if (scrollTop < sectionArray.value[1]) {
          curTab.value = 'A'
        } else if (scrollTop < sectionArray.value[2]) {
          curTab.value = 'B'
        } else {
          console.log(1111, 3333)
          curTab.value = 'C'
        }
      }
    }
    const renderDetail = () => {
      return (
        <div class={'detail'} onScroll={useDebounceFn(onScroll, 100)}>
          <h3 ref={saveH3dom} id="detailA">
            详情A
          </h3>
          <p>胜利大街发了就，第三方拉伸了，胜利大街覅啦，的森林放假啦</p>
          <p>胜利大街发了就，第三方拉伸了，胜利大街覅啦，的森林放假啦</p>
          <p>胜利大街发了就，第三方拉伸了，胜利大街覅啦，的森林放假啦</p>
          <p>胜利大街发了就，第三方拉伸了，胜利大街覅啦，的森林放假啦</p>

          <h3 ref={saveH3dom} id="detailB">
            详情B
          </h3>
          <p>胜利大街发了就，第三方拉伸了，胜利大街覅啦，的森林放假啦</p>
          <p>胜利大街发了就，第三方拉伸了，胜利大街覅啦，的森林放假啦</p>
          <p>sdfafdsaf的说法是，圣诞福利撒旦教发，收到了福建三，胜利大街发了是，收到了福建</p>
          <p>sdfafdsaf的说法是，圣诞福利撒旦教发，收到了福建三，胜利大街发了是，收到了福建</p>
          <p>sdfafdsaf的说法是，圣诞福利撒旦教发，收到了福建三，胜利大街发了是，收到了福建</p>

          <h3 ref={saveH3dom} id="detailC">
            详情C
          </h3>
          <p>胜利大街发了就，第三方拉伸了，胜利大街覅啦，的森林放假啦</p>
          <p>胜利大街发了就，第三方拉伸了，胜利大街覅啦，的森林放假啦</p>
          <p>sdfafdsaf的说法是，圣诞福利撒旦教发，收到了福建三，胜利大街发了是，收到了福建</p>
          <p>sdfafdsaf的说法是，圣诞福利撒旦教发，收到了福建三，胜利大街发了是，收到了福建</p>
          <p>sdfafdsaf的说法是，圣诞福利撒旦教发，收到了福建三，胜利大街发了是，收到了福建</p>
          <p>胜利大街发了就，第三方拉伸了，胜利大街覅啦，的森林放假啦</p>
          <p>胜利大街发了就，第三方拉伸了，胜利大街覅啦，的森林放假啦</p>
          <p>sdfafdsaf的说法是，圣诞福利撒旦教发，收到了福建三，胜利大街发了是，收到了福建</p>
          <p>sdfafdsaf的说法是，圣诞福利撒旦教发，收到了福建三，胜利大街发了是，收到了福建</p>
          <p>sdfafdsaf的说法是，圣诞福利撒旦教发，收到了福建三，胜利大街发了是，收到了福建</p>
        </div>
      )
    }
    return () => (
      <div class={'box'}>
        <nav>
          {tabs.map((item) => (
            <div class={['nav-item', item.key === curTab.value && 'active']} onClick={() => onItemClick(item)}>
              {item.text}
            </div>
          ))}
        </nav>
        {renderDetail()}
      </div>
    )
  },
})

const getData = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(1200)
    }, 2000)
  })
}

export const AsyncScrollFixed = defineAsyncComponent({
  loader: async () => {
    const data = await getData()
    return <ScrollFixed data={data}></ScrollFixed>
  },
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000,
})
