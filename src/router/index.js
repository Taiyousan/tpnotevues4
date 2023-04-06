import { createRouter, createWebHistory } from 'vue-router'
import Personnages from '../views/Personnages.vue'
import Episodes from '../views/Episodes.vue'
import FichePerso from '../views/FichePerso.vue'

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
    },
    {
      path: '/ficheperso/:id',
      name: 'ficheperso',
      component: FichePerso
    }
  ]
})

export default router
