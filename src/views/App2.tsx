import { RouterView } from 'vue-router'
import { KeepAlive, Transition } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Test',
  setup() {
    //slots 默认 {default: () => {}}
    const routerSlots = ({ Component, route }) => {
      return (
        <Transition name={route?.meta?.transition || 'van-fade'}>
          <KeepAlive include={[]} max={5}>
            <Component />
          </KeepAlive>
        </Transition>
      )
    }
    return () => <RouterView>{routerSlots}</RouterView>
  },
})
