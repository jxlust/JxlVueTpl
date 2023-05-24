export default defineComponent({
  name: 'EllipsisText',
  setup(props, { slots }) {
    const container = ref<HTMLDivElement>()
    const spanRef = ref<HTMLSpanElement>()
    return () => (
      <div ref={container}>
        <span ref={spanRef}>{slots.default?.()}</span>
      </div>
    )
  },
})
