/*
 * @Descripttion:
 * @version:
 * @Author: jxlust jxljxufe@163.com
 * @Date: 2022-05-28 21:38:12
 * @LastEditors: jxlust
 * @LastEditTime: 2022-06-07 16:53:15
 */
// createWebHistory createWebHashHistory
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const HelloWorld = () => import('@/package/helloworld/index.vue')
const TestVue = () => import('@/views/tsx-vue/index')
const Test = () => import('@/views/test/index.vue')
const ApiTest = () => import('@/package/vue-study/index.vue')
const PagerOver = () => import('@/views/pager-over/index.vue')
const VueUse = () => import('@/package/vue-use/index.vue')
const MockTest = () => import('@/package/mock-test/index.vue')
const NotFoundComponent = () => import('@/views/404/index.vue')
const MyEditor = () => import('@/views/my-editor/index.vue')
const VueDemo = () => import('@/views/vue-demo/index.vue')
const SomeComp = () => import('@/views/some-component/index.vue')
const WaterWall = () => import('@/views/water-wall/flex-col.vue')

const ScrollPager = () => import('@/views/pager-scroll/index.vue')

const routes: Array<RouteRecordRaw> = [
  { path: '/:pathMatch(.*)', component: NotFoundComponent },
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'my home',
      keepAlive: true,
    },
    component: HelloWorld,
    // children: [
    //   {
    //     path: 'abs',
    //     component: () => xxxx,
    //   },
    // ],
  },
  {
    path: '/textover',
    name: 'textover',
    meta: {
      title: 'my textover',
      keepAlive: true,
    },
    component: TestVue,
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      title: 'my test',
      keepAlive: true,
    },
    component: Test,
  },
  {
    path: '/vue-api',
    name: 'vueApi',
    meta: {
      title: 'vueApi study',
      keepAlive: true,
    },
    component: ApiTest,
  },
  {
    path: '/pager-over',
    name: 'PagerOver',
    meta: {
      title: 'PagerOver',
      keepAlive: true,
    },
    component: PagerOver,
  },
  {
    path: '/vue-use',
    name: 'VueUse',
    meta: {
      title: 'VueUse',
      keepAlive: true,
    },
    component: VueUse,
  },
  {
    path: '/mock-test',
    name: 'MockTest',
    meta: {
      title: 'MockTest',
      keepAlive: true,
    },
    component: MockTest,
  },
  {
    path: '/editor',
    name: 'editor',
    component: MyEditor,
  },
  {
    path: '/vue-demo',
    name: 'vue-demo',
    component: VueDemo,
  },
  { path: '/some-comp', name: 'some-comp', component: SomeComp },
  { path: '/water-wall', name: 'water-wall', component: WaterWall },
  { path: '/pager-scroll', name: 'scroll-pager', component: ScrollPager },
]

const router = createRouter({
  // history: createWebHistory('/'),
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to) => {
  document.title = (to?.meta?.title as string) ?? document.title
  return true
})

export default router
