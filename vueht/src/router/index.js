import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/layout/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'homePage',
          component: () => import('../pages/Home.vue')
        }
      ]
    },
    {
      path: '/category',
      name: 'category',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'categoryPage',
          component: () => import('../pages/Category.vue')
        }
      ]
    },
    {
      path: '/product',
      name: 'product',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'productPage',
          component: () => import('../pages/Product.vue')
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'profilePage',
          component: () => import('../pages/Profile.vue')
        }
      ]
    }
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('adminToken')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})

export default router