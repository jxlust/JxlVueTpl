export default defineComponent({
  name: 'MyItem',
  props: {
    text: [String, Number],
  },
  setup(props) {
    return () => <span class={'my-item'}>{props.text}</span>
  },
})
