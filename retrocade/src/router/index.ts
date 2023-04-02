import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameControllerView from '../views/GameControllerView.vue'
import GameDisplayView from '../views/GameDisplayView.vue'
import AboutView from '../views/AboutView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: GameControllerView
  },
  {
    path: '/game',
    name: 'about',
    component: GameDisplayView
  },
  {
    path: '/about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
