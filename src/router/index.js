import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由表
const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/layout',
    component: () => import('@/views/layout'),
    // redirect: '/home',
    children: [
      {
        path: 'home', // 默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/articleDetail')
  },
  {
    path: '/myinfo',
    name: 'myinfo',
    component: () => import('@/views/my/MyInfo.vue')
  },
  {
    path: '/editname',
    name: 'editname',
    component: () => import('@/views/my/editName.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
