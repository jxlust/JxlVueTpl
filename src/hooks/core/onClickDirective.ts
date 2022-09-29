import { Directive } from 'vue';
import { useEventListener } from './useEventListener';

export const vOnClickOutside: Directive = {
  mounted(el, binding) {
    const capture = binding.modifiers.bubble;
    console.log(1, capture);
    const listener = (event: PointerEvent) => {
      // window.clearTimeout(fallback)
      // const el = unrefElement(target)
      console.log('path:', event.composedPath());

      if (!el || el === event.target || event.composedPath().includes(el)) {
        //event.target
        // use contains check
        // el.contains((event.target as HTMLElement))
        return;
      }
      binding.value(event);
    };

    el._stop_effect = useEventListener(window, 'click', listener, {
      capture,
    });
  },
  unmounted(el) {
    el._stop_effect();
  },
};
