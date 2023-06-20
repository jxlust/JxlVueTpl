// import './index.scss'
import styles from './index.module.scss'

import { makeNumberProp, makeStringProp } from '@/utils'
import { ExtractPropType } from 'element-plus/es/utils'
import { Teleport, Transition, WatchSource } from 'vue'
export type ToastType = 'text' | 'loading' | 'success' | 'fail' | 'html'
const toastProps = {
  show: Boolean,
  message: String,
  type: makeStringProp<ToastType>('text'),
  duration: makeNumberProp(2000),
  teleport: String,
  transitionAppear: Boolean,
}

export type ToastProps = ExtractPropType<typeof toastProps>
export const useLazyRender = (show: WatchSource<boolean>) => {
  const init = ref(false)
  watch(
    show,
    (val) => {
      // if (val) {
      console.log(11, val)
      init.value = val
      // }
    },
    {
      immediate: true,
    },
  )
  return (render: () => JSX.Element) => () => init.value ? render() : null
}
export default defineComponent({
  name: 'JToast',
  props: toastProps,
  emits: ['update:show', 'closed'],
  setup(props, { emit }) {
    let timer: NodeJS.Timeout
    console.log(111, styles)
    const updateShow = (show: boolean) => emit('update:show', show)
    const onClosed = () => emit('closed')

    const onOpened = () => {
      console.log('onOpened')
    }
    const clearTimer = () => clearTimeout(timer)
    watch(
      () => [props.show, props.message],
      () => {
        console.log('show:', props.show)
        clearTimer()
        if (props.show) {
          timer = setTimeout(() => {
            updateShow(false)
          }, props.duration)
        }
      },
    )

    // watch(
    //   () => props.show,
    //   (v) => {},
    //   {
    //     immediate: true,
    //   },
    // )
    // const layzRender = (render: () => JSX.Element) => {
    //   return () => (props.show ? render() : null)
    // }

    const layzRender = useLazyRender(() => props.show)
    const renderPop = layzRender(() => (
      <div v-show={props.show} class={styles['test-pop']}>
        <span>{props.message}</span>
      </div>
    ))

    const renderTransition = () => {
      return (
        <Transition
          v-slots={{ default: renderPop }}
          name="van-fade"
          appear={props.transitionAppear}
          onAfterEnter={onOpened}
          onAfterLeave={onClosed}
        />
      )
    }
    const renderTeleport = () => <Teleport to={props.teleport}>{renderTransition()}</Teleport>

    return () => (props.teleport ? renderTeleport() : renderTransition())
  },
})
