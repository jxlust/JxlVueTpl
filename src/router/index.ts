import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const HelloWorld = () => import(/* webpackChunkName: "mdshow" */ '@/components/HelloWorld.vue');
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'my home',
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    children: [
      {
        path: 'abs',
        component: () => HelloWorld,
      },
    ],
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  document.title = (to?.meta?.title as string) ?? document.title
  return true
})

export default router;
