import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../components/Home.vue'),
    },
    {
      path: '/register',
      component: () => import('../components/Register.vue'),
    },{
      path: '/create',
      component: () => import('../components/PostBlog.vue'),
    },{
      path: '/login',
      component: () => import('../components/Login.vue'),
    },{
      path: '/blogposts/:id',
      component: () => import('../components/showBlog.vue'),
    },{
      path: '/user-profile',
      component: () => import('../components/UserProfil.vue'),
    },{
      path: '/search',
      component: () => import('../components/SearchBlog.vue'),
    }
       
   
    
  ]
})

export default router
