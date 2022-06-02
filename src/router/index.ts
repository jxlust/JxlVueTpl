import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const HelloWorld = () => import('@/components/HelloWorld.vue');
const TestVue = () => import('@/views/TsxVue/index');
const Test = () => import('@/views/Test/index.vue');
const routes: Array<RouteRecordRaw> = [
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
    //     component: () => HelloWorld,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  document.title = (to?.meta?.title as string) ?? document.title;
  return true;
});

export default router;
