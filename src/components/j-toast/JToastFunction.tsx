import { mountComponent, usePopupState } from '@/vant-lib/utils/mount-component'
import JToast from './JToast'
import { ToastWrapperInstance } from 'vant/lib/toast/types'
import { extend, isObject, withInstall } from 'vant/lib/utils'
import { App } from 'vue'

let queue: ToastWrapperInstance[] = []
let allowMultiple = false
// let currentOptions = extend({}, defaultOptions)

// default options of specific type
// const defaultOptionsMap = new Map<string, ToastOptions>()

function createInstance() {
  const { instance, unmount } = mountComponent({
    setup(_, { expose }) {
      const message = ref('')
      const { open, state, close, toggle } = usePopupState()

      const onClosed = () => {
        // console.log('unmount:', unmount)
        // unmount()
        if (allowMultiple) {
          // 多toast模式，为了保证只插入一个dom节点，需要触发移除dom
          queue = queue.filter((item) => item !== instance)
          unmount()
        }
      }
      watch(message, (val) => {
        state.message = val
      })

      const attrs: Record<string, unknown> = {
        onClosed,
        'onUpdate:show': toggle,
      }
      expose({
        message,
        open,
        clear: close,
      })
      // getCurrentInstance()?.exposed()
      return () => <JToast {...state} {...attrs} />
    },
  })

  console.log('instance:', instance)
  return instance as ToastWrapperInstance
}

function getInstance() {
  if (!queue.length || allowMultiple) {
    const instance = createInstance()
    queue.push(instance)
  }
  return queue[queue.length - 1]
}

type MyToastOptions = {
  message?: string
}
function parseOptions(message: string | MyToastOptions): MyToastOptions {
  if (isObject(message)) {
    return message
  }
  return { message }
}
function Toast(options: MyToastOptions = {}) {
  const toast = getInstance()
  console.log('toast:', toast)
  const parsedOptions = parseOptions(options)
  toast.open(
    extend({}, parsedOptions, {
      teleport: 'body',
    }),
  )
  return toast
}

Toast.allowMultiple = (v: boolean) => {
  allowMultiple = v
}
Toast.install = (app: App) => {
  app.use(withInstall(JToast))
  app.config.globalProperties.$toast = Toast
}
Toast.clear = (all?: boolean) => {
  if (queue.length) {
    if (all) {
      for (const toast of queue) {
        toast.clear()
      }
      queue = []
    } else {
      queue.shift()?.clear()
    }
  }
}

export { Toast }
