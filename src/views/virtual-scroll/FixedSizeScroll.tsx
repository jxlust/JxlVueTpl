import { CSSProperties } from 'vue'

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
  },
  setup(props, { slots }) {
    const { width, height, itemSize, itemCount } = toRaw(props)
    const containerStyle: CSSProperties = {
      position: 'relative',
      width: `${width || 0}px`,
      height: `${height || 0}px`,
      overflow: 'auto',
    }
    const contentStyle: CSSProperties = {
      height: itemSize * itemCount,
      width: '100%',
    }

    const renderChildren = () => {
      const list = [2, 4, 5, 6, 8]
      return list.map((item, index) => slots.default?.(item, index))
    }
    return () => (
      <div style={containerStyle}>
        <div style={contentStyle}>{renderChildren()}</div>
      </div>
    )
  },
})
