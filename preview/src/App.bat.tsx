import { KeepAlive, Transition } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
export default defineComponent({
  name: 'App',
  setup() {
    // keep alive cached views
    const cachedViews: string[] = []

    //slots 默认 {default: () => {}}
    const routerSlots = ({ Component, route }) => {
      return (
        <Transition key={route.path} name={route?.meta?.transition || 'van-fade'} mode="out-in">
          <KeepAlive include={cachedViews} max={5}>
            {/* <div key={route.path}>{h(Component)}</div> */}
            <Component />
          </KeepAlive>
        </Transition>
      )
    }

    const initAppData = () => {}
    onMounted(() => {})
    initAppData()

    return () => (
      <>
        <RouterView>{routerSlots}</RouterView>
        <RouterLink to={'/test'}>test</RouterLink>
        <RouterLink to={'/home'}>home</RouterLink>
      </>
    )
  },
})
