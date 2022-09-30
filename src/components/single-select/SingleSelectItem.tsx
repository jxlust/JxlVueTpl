import { useParent } from '@/vant-lib/vant-use/useRelation'
import { unknownProp } from '@/vant-lib/utils'
import { ExtractPropTypes } from 'vue'
import { ONE_LINE_KEY } from './SingleSelect'

const selectItemProps = {
  text: String,
  value: unknownProp,
  modelValue: unknownProp,
  item: unknownProp,
}
export type SelectItemType = ExtractPropTypes<typeof selectItemProps>

export default defineComponent({
  name: 'SingleSelectItem',
  props: selectItemProps,
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const { parent } = useParent(ONE_LINE_KEY)
    const onClick = () => {
      if (parent) {
        parent.updateValue(props.value)
      } else {
        emit('update:modelValue', props.value)
      }
    }
    const checked = () => {
      return parent?.props.modelValue === props.value
    }
    return () => (
      <div class={['nav-filter-item', { active: checked() }]} onClick={onClick}>
        {props.text}
      </div>
    )
  },
})
