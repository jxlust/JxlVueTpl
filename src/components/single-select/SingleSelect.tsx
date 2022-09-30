import { ExtractPropTypes, Transition, InjectionKey, ComponentPublicInstance } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import '@/assets/less/one-line-list.less'
import { ClickOutside } from 'element-plus'
import { useChildren } from '@/vant-lib/vant-use/useRelation'
import { unknownProp } from '@/vant-lib/utils'

export type ComponentInstance = ComponentPublicInstance<{}, any>

const oneLineListProps = {
  modelValue: unknownProp,
  item: unknownProp,
  disabled: Boolean,
}
export type OneLineListType = ExtractPropTypes<typeof oneLineListProps>

export type OneLineProvide = {
  props: OneLineListType
  updateValue: (value: unknown) => void
  // updateItem: (value: unknown) => void;
}
export const ONE_LINE_KEY: InjectionKey<OneLineProvide> = Symbol('one-line-list')

const getComponentsListHidenIndex = (components: ComponentPublicInstance[]) => {
  const index = components.findIndex((item: ComponentPublicInstance) => {
    const { $el } = item
    const offsetHeight = ($el as HTMLElement).offsetHeight
    return ($el as HTMLElement).offsetTop >= offsetHeight
  })
  return index
}

export default defineComponent({
  name: 'OneLineList',
  directives: { clickoutside: ClickOutside },
  props: oneLineListProps,
  emits: ['change', 'update:modelValue', 'update:item'],

  setup(props, { emit, slots }) {
    const { linkChildren, children } = useChildren(ONE_LINE_KEY)

    const navListRef = ref()
    const moreBtnRef = ref()

    const showMorePopview = ref(false)
    const isOverflow = ref(false)
    // const isCheckMore = ref(false);

    const hideComponents = reactive<ComponentInstance[]>([])

    const isCheckMore = () => {
      return hideComponents.some((item) => item.value === props.modelValue)
    }
    const updateValue = (value: unknown) => emit('update:modelValue', value)
    // const updateItem = (item: unknown) => emit('update:item', item);
    const computedHideList = () => {
      const navDom: HTMLElement = navListRef.value
      if (navDom.scrollHeight > navDom.clientHeight) {
        isOverflow.value = true
      }

      if (children?.length) {
        const index = getComponentsListHidenIndex(children)
        if (index > 0) {
          //overflow one line
          hideComponents.push(...children.slice(index))
        }
      }
    }

    watch(
      () => props.modelValue,
      (newV) => {
        // console.log('newV:', newV);
        emit('change', newV)
      },
    )

    watch(children, () => {
      computedHideList()
    })

    const handleMoreClick = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()
      showMorePopview.value = !showMorePopview.value
    }

    const handleFilterClick = (item: ComponentInstance) => {
      showMorePopview.value = false
      updateValue(item.value)
    }

    const arrowClass = computed(() => {
      return ['section-nav-more-btn', { show: showMorePopview.value, active: isCheckMore() }]
    })

    const onClickOutside = (e: Event) => {
      const targetEl = e.target as HTMLElement
      const moreBtnDom = moreBtnRef.value as HTMLElement
      if (!moreBtnDom.contains(targetEl)) {
        showMorePopview.value = false
      }
      // window.getSelection ? window?.getSelection().removeAllRanges() : document?.selection.empty();
    }

    onMounted(() => {
      computedHideList()
    })

    const renderHideLists = (item: ComponentInstance) => {
      return (
        <div
          onClick={handleFilterClick.bind(this, item)}
          class={['section-list-popover__item', { active: item.value === props.modelValue }]}
        >
          <span class={'label-text'}>{item.text}</span>
        </div>
      )
    }

    const renderPopover = () => {
      if (isOverflow.value) {
        return (
          <Transition name={'fade'}>
            <div class={'section-list-popover'} v-show={showMorePopview.value} vClickoutside={onClickOutside}>
              {hideComponents.map(renderHideLists)}
            </div>
          </Transition>
        )
      }
    }

    linkChildren({
      props,
      updateValue,
      // updateItem,
    })

    return () => (
      <>
        <div class={['section-nav-list', { 'show-more-btn': isOverflow.value }]} ref={navListRef}>
          {slots.default?.()}
          {isOverflow.value && (
            <div ref={moreBtnRef} onClick={handleMoreClick} class={arrowClass.value}>
              更多
              <ElIcon>
                <ArrowDown />
              </ElIcon>
            </div>
          )}
        </div>
        {renderPopover()}
      </>
    )
  },
})
