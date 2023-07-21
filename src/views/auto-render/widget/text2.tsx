const commonProps = {
  field: Object,
  indexOfParentList: {
    type: Number,
    required: true,
  },
  parentList: Array,
}
export default defineComponent({
  name: 'Text2Widget',
  props: commonProps,
  setup(props) {
    const title = computed(() => {
      return props.indexOfParentList + (props.field?.color || 'none-color')
    })
    const sytleCss = computed(() => {
      return {
        fontSize: '14px',
        color: props.field?.color || 'green',
      }
    })
    const num = ref(1)
    const addClick = () => {
      num.value++
    }
    return () => (
      <div>
        <span style={sytleCss.value}>
          {num.value}-{title.value}
        </span>
        <button onClick={addClick}>add</button>
      </div>
    )
  },
})
