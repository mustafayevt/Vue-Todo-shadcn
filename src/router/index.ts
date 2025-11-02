import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/Home.vue')
const NotFound = () => import('@/views/NotFound.vue')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router

