import { createRouter, createWebHistory } from 'vue-router'
import Texture1 from '../views/texture1/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'texture',
      component: Texture1,
    },
  ],
})

export default router
