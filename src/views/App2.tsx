import { KeepAlive, Transition } from 'vue'
import { RouterView } from 'vue-router'

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
