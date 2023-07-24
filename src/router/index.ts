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
const FullScreen = () => import('@/views/full-screen/index.vue')
const ChartDemo = () => import('@/views/echar-demo/index.vue')
const VirtualScroll = () => import('@/views/virtual-scroll/index.vue')
const ToastDemo = () => import('@/views/toast/index.vue')
const DragCol = () => import('@/views/drag-col/index.vue')
const VfromDesign = () => import('@/views/vform/design.vue')
const VfromRender = () => import('@/views/vform/render.vue')
const AutoRender = () => import('@/views/auto-render/index.vue')
const AutoRender2 = () => import('@/views/auto-render2/index.vue')

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
  { path: '/screen', name: 'screen', component: FullScreen },
  { path: '/chart', name: 'chart', component: ChartDemo },
  { path: '/drag', name: 'drag', component: DragCol },
  { path: '/virtual', name: 'virtual', component: VirtualScroll },
  { path: '/toast', name: 'toast', component: ToastDemo },
  { path: '/vform', name: 'vform', component: VfromDesign },
  { path: '/vform-render', name: 'vform-render', component: VfromRender },
  { path: '/auto-render', name: 'auto-render', component: AutoRender },
  { path: '/auto-render2', name: 'auto-render2', component: AutoRender2 },
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
