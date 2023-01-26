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
  { path: '/dashboard/perfil', name: 'perfil', component: import('../components/UserProfile.vue') },
  { path: '/dashboard', name: 'dashboard', component: import('../components/DashBoard.vue')},
  { path: '/dashboard/articulos', name: 'articulos', component:import('../components/ArticlesComponent.vue')},
]

const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  
})
// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('access_token');
    if (!token  &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'login' && to.name !== 'signup') {
        console.log('Entree')
        return { path: '/login' }
    }
    else{
        if((to.name == 'login' || to.name == 'signup') && token){
            return { path: '/dashboard' }
        }
        console.log('No entree')
        next()
    }
  })
export default router
