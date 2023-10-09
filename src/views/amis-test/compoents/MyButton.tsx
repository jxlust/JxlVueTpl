import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'MyButton',
  props: {
    a: Number,
  },
  setup(props) {
    return () => <ElButton>1 {props.a}</ElButton>
  },
})
