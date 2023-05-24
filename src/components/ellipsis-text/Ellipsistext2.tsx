const EllipsisTextProps = {
  // 是否保留后缀
  suffix: {
    type: Boolean,
    default: false,
  },
  // 出现省略号的行数
  startEllipsisLine: {
    type: Number,
    default: 1,
  },
  //边界修正值
  boundaryValue: {
    type: Number,
    default: 0,
  },
  text: [String],
}
export default defineComponent({
  name: 'EllipsisText',
  props: EllipsisTextProps,
  setup(props) {
    const container = ref<HTMLDivElement>()
    const spanRef = ref<HTMLSpanElement>()
    const attrs = useAttrs()

    const cssEntirely = computed<boolean>(() => {
      return !props.suffix && props.startEllipsisLine === 1
    })

    function autoElipsis(container: HTMLElement, textNode: HTMLSpanElement) {
      const str = props.text || ''
      textNode.textContent = str
      container.style.whiteSpace = 'nowrap'
      container.style.width = 'fit-content'
      const containerWidth = container.clientWidth
      const parent = container.parentElement // outer parents element
      const parentWidth = parent!.clientWidth || parent!.offsetWidth
      if (containerWidth <= parentWidth) {
        textNode.textContent = str
      } else if (cssEntirely.value) {
        container.style.width = parentWidth + 'px'
        container.style.whiteSpace = 'nowrap'
        container.style.textOverflow = 'ellipsis'
        container.style.overflow = 'hidden'
      } else {
        const textWidth = textNode.offsetWidth
        const strNumer = str.length
        const avgStrWidth = textWidth / strNumer
        const canFitStrNumber = Math.floor((parentWidth * props.startEllipsisLine) / avgStrWidth)
        const shouldDelNumber = strNumer - canFitStrNumber + 1.5 + props.boundaryValue
        const delEachSide = shouldDelNumber / 2
        const endLeft = Math.floor(strNumer / 2 - delEachSide)
        const startRight = Math.ceil(strNumer / 2 + delEachSide)
        if (props.suffix) {
          textNode.textContent = str.slice(0, endLeft) + '...' + str.slice(startRight)
        } else {
          textNode.textContent = str.slice(0, -shouldDelNumber) + '...'
        }
        container.style.wordBreak = 'break-all'
        container.style.whiteSpace = 'normal'
      }
    }
    watch(
      () => props.text,
      () => {
        if (container.value && spanRef.value) {
          autoElipsis(container.value, spanRef.value)
        }
      },
    )

    onMounted(() => {
      if (container.value && spanRef.value) {
        autoElipsis(container.value, spanRef.value)
      }
    })

    return () => (
      <div ref={container} {...attrs}>
        <span ref={spanRef}>{props.text}</span>
      </div>
    )
  },
})
