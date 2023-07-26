import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LayOut1 from '../layout/layout1.vue'
import LayOut2 from '../layout/layout2.vue'

// const HelloWorld = () => import('@/package/helloworld/index.vue')

const NotFoundComponent = () => import('@/views/404/index.vue')
const TestComp2 = () => import('../views/test2.vue')
const TestComp1 = () => import('../views/test1.vue')

const routes: Array<RouteRecordRaw> = [
  { path: '/:pathMatch(.*)', component: NotFoundComponent },
  {
    path: '',
    name: 'Home',
    redirect: '/lng',
    meta: {
      title: 'my home',
      keepAlive: true,
    },
    component: LayOut1,
    children: [
      {
        path: '/lng',
        component: TestComp1,
      },
      {
        path: '/:fruitName',
        component: TestComp2,
      },
    ],
  },
  {
    path: '/fruit',
    name: 'Fruit',
    // redirect: '/fruit/test',
    meta: {
      title: 'my fruit',
      keepAlive: true,
    },
    component: LayOut2,
    children: [
      {
        path: 'test',
        component: TestComp2,
      },
    ],
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
