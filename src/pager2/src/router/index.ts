import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// const HelloWorld = () => import('@/package/helloworld/index.vue')

const NotFoundComponent = () => import('@/views/404/index.vue')
const TestComp = () => import('../Test.vue')
const routes: Array<RouteRecordRaw> = [
  { path: '/:pathMatch(.*)', component: NotFoundComponent },
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'my home',
      keepAlive: true,
    },
    component: TestComp,
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  // history: createWebHashHistory(),
  routes,
})

router.beforeEach((to) => {
  document.title = (to?.meta?.title as string) ?? document.title
  return true
})

export default router
