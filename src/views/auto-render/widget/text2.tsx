export default defineComponent({
  name: 'Text2Widget',
  props: {
    title: String,
  },
  setup(props) {
    const title = computed(() => {
      return props.title || '-'
    })
    const num = ref(1)
    const addClick = () => {
      num.value++
    }
    return () => (
      <div>
        <span>
          {num.value}- {title.value}
        </span>
        <button onClick={addClick}>add</button>
      </div>
    )
  },
})
