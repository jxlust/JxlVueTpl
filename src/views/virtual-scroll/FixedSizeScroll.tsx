import { CSSProperties } from 'vue'

// 绝对定位top值
export default defineComponent({
  name: 'FixedSizeScroll',
  props: {
    width: [Number],
    height: Number,
    itemSize: {
      type: Number,
      required: true,
    },
    itemCount: {
      type: Number,
      required: true,
    },
    item: {
      type: [Object, Function],
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
    const contentStyle: CSSProperties = {
      height: itemSize * itemCount + 'px',
      width: '100%',
    }

    // const renderSlotsChildren = () => {
    //   const list = [2, 4, 5, 6, 8].concat(scrollOffset.value)
    //   return list.map((item, index) => slots.default?.({ item, index }))
    // }

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
      // 渲染list
      for (let i = topIndex; i <= bottomIndex; ++i) {
        const itemStyle = {
          position: 'absolute',
          height: `${itemSize}px`,
          width: '100%',
          // 计算每个元素在container中的top值
          top: itemSize * i + 'px',
        }
        //@ts-ignore
        list.push(<Child style={itemStyle} text={i} />)
      }
      return list
    }

    const handleScroll = (e: Event) => {
      const { scrollTop } = e.currentTarget as HTMLElement
      console.log('scrollTop:', scrollTop)
      scrollOffset.value = scrollTop
    }
    return () => (
      <div style={containerStyle} class={'scroll-container'} onScroll={handleScroll}>
        <div style={contentStyle} class={'scroll-content'}>
          {renderChildren()}
        </div>
      </div>
    )
  },
})
