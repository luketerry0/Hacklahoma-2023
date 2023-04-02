import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LobbyView from '../views/LobbyView.vue'
import GameControllerView from '../views/GameControllerView.vue'
import GameDisplayView from '../views/GameDisplayView.vue'
import AboutView from '../views/LobbyView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Lobby',
    component: LobbyView
  },
  {
    path: '/game',
    name: 'about',
    component: GameDisplayView
  },
  {
    path: '/c',
    component: GameControllerView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
