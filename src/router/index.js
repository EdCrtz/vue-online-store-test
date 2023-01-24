import { createRouter,createWebHistory} from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'signup',
    component: () => import('../components/SignupStore.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/LoginStore.vue')
  },
]
const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  
})
export default router
