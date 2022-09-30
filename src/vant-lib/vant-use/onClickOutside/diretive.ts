import { Directive } from 'vue'
import { onClickOutside } from '.'

export const vOnClickOutside: Directive = {
  mounted(el, binding) {
    console.log('----> mounted')
    // const capture = !binding.modifiers.bubble;
    if (typeof binding.value === 'function') {
      el.__onClickOutside_stop = onClickOutside()
    } else {
      el.__onClickOutside_stop = onClickOutside()
    }
  },
  unmounted(el: HTMLElement) {
    console.log(el)
  },
}
