import { createRouter, createWebHistory } from 'vue-router'
import Personnages from '../views/Personnages.vue'
import Episodes from '../views/Episodes.vue'
import FichePerso from '../views/FichePerso.vue'
import FicheEpisode from '../views/FicheEpisode.vue'

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
    },
    {
      path: '/ficheepisode/:id',
      name: 'ficheepisode',
      component: FicheEpisode
    }
  ]
})

export default router
