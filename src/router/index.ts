import { createRouter, createWebHistory } from 'vue-router'
import EditorView from '../views/EditorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'editor',
      component: EditorView
    },
    {
      path: '/info',
      name: 'info',
      // route level code-splitting
      // this generates a separate chunk (Info.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/InfoView.vue')
    },
    {
      path: '/print',
      name: 'print',
      component: () => import('@/views/PrintView.vue')
    },
    {
      path: '/template',
      name: 'template',
      component: () => import('@/views/TemplateView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
  ]
})

export default router
