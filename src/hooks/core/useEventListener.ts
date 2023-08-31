//study eventlistener use
import { ComputedRef, Ref, watch, getCurrentScope, onScopeDispose } from 'vue'

//some type...
export type MaybeRef<T> = T | Ref<T>

export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>

export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>

type Fn = () => void
export const isClient = typeof window !== 'undefined'

//清除副作用 clear effect
export const tryOnScopeDispose = (fn) => {
  console.log('current scope:', getCurrentScope())
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
//empty function
const noop = () => {}

export function useEventListener(
  target: MaybeComputedRef<EventTarget | null | undefined>,
  event: string,
  listener: any,
  options?: boolean | AddEventListenerOptions,
): Fn

export function useEventListener(...args: any[]): Fn {
  let target: MaybeComputedRef<EventTarget> | undefined
  let type: string
  let listener: any
  let options: any

  if (typeof args[0] === 'string') {
    ;[type, listener, options] = args
    target = isClient ? window : undefined
  } else {
    ;[target, type, listener, options] = args
  }

  if (!target) {
    return noop
  }
  let clearup = noop
  const stopWatch = watch(
    () => unref(target),
    (el: HTMLElement) => {
      console.log('监听到event target el:', el)
      //clear preview event
      clearup()
      if (!el) {
        return
      }

      el.addEventListener(type, listener, options)

      clearup = () => {
        //remove event listener
        console.error('clearup event', type, listener)
        el.removeEventListener(type, listener, options)
        clearup = noop
      }
    },
    {
      immediate: true,
      flush: 'post', // vue组件更新之后触发监听
    },
  )

  const stop = () => {
    stopWatch()
    clearup()
  }
  //scope dispose
  tryOnScopeDispose(stop)
  return stop
}
