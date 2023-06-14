import { CSSProperties, Component } from 'vue'

// 采用padding的思路优化
export default defineComponent({
  name: 'FixedSizeScroll',
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    itemSize: {
      type: Number,
      required: true,
    },
    itemCount: {
      type: Number,
      required: true,
    },
    item: {
      type: Object as PropType<Component>,
      required: true,
    },
  },
  setup(props) {
    const { width, height, itemSize, itemCount } = toRaw(props)
    const scrollOffset = ref<number>(0)
    const containerStyle: CSSProperties = {
      position: 'relative',
      width: `${width || 0}px`,
      height: `${height || 0}px`,
      overflow: 'auto',
    }
    // const contentStyle: CSSProperties = {
    //   // height: itemSize * itemCount + 'px',

    //   width: '100%',
    // }
    const paddingState = reactive({
      top: 0,
      bottom: 0,
    })
    const contentStyle = computed(() => {
      return {
        padding: `${paddingState.top}px 0 ${paddingState.bottom}px 0`,
        width: '100%',
      }
    })

    const renderChildren = () => {
      const { item: Child } = props
      const list: any[] = []
      // 计算dom的列表
      // 分为：上缓存区域 + 中间可视区域 + 下缓存区域

      // 计算开始可视区域索引
      const startIndex = (scrollOffset.value / itemSize) | 0
      // 上缓存区开始索引
      const topIndex = Math.max(0, startIndex - 2)
      // 可视区域可以展示的条数
      const viewCount = ((height || 0) / itemSize) | 0
      // 下缓存区域结束索引
      const bottomIndex = Math.min(itemCount - 1, startIndex + viewCount + 2)
      // 计算padding
      // 优化一下，下缓存区域即将滚动完，才计算

      paddingState.top = topIndex * itemSize
      paddingState.bottom = (itemCount - bottomIndex - 1) * itemSize
      // 渲染list
      for (let i = topIndex; i <= bottomIndex; ++i) {
        const itemStyle = {
          // position: 'absolute',
          height: `${itemSize}px`,
          width: '100%',
        }
        //@ts-ignore
        list.push(<Child style={itemStyle} text={i} />)
      }
      return list
    }

    const handleScroll = (e: Event) => {
      const { scrollTop } = e.currentTarget as HTMLElement
      // console.log('scrollTop:', scrollTop)
      scrollOffset.value = scrollTop
    }
    return () => (
      <div style={containerStyle} class={'scroll-container'} onScroll={handleScroll}>
        <div style={contentStyle.value} class={'scroll-content'}>
          {renderChildren()}
        </div>
      </div>
    )
  },
})
