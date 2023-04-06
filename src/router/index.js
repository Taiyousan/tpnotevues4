import { createRouter, createWebHistory } from 'vue-router'
import Personnages from '../views/Personnages.vue'
import Episodes from '../views/Episodes.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'personnages',
      component: Personnages
    },
    {
      path: '/episodes',
      name: 'episodes',
      component: Episodes

    }
  ]
})

export default router
