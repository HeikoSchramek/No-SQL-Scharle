import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../components/Home.vue'),
  },
  {
    path: '/register',
    component: () => import('../components/Register.vue'),
  },
  {
    path: '/create',
    component: () => import('../components/PostBlog.vue'),
    meta: { requiresAuth: true } // Beispiel für eine Route, die Authentifizierung erfordert
  },{
    path: '/blogposts/:id',
    component: () => import('../components/showBlog.vue'),
  },
  {
    path: '/login',
    component: () => import('../components/Login.vue'),
  },
  {
    path: '/allUser',
    component: () => import('../components/ShowAllUser.vue'),
    meta: { requiresAuth: true, isAdmin: true } // Beispiel für eine Admin-spezifische Route
  },{
    path: '/user-profile',
    component: () => import('../components/UserProfil.vue'),
    meta: { requiresAuth: true }
  },{
    path: '/search',
    component: () => import('../components/SearchBlog.vue'),
  },{
    path: '/edit-user/:id',
    component: () => import('../components/EditUser.vue'),
    meta: { requiresAuth: true }
  },{
    path: '/myBlogs',
    component: () => import('../components/ShowUserBlogs.vue'),
    meta: { requiresAuth: true }
  },{
    path: '/editBlog/:id',
    component: () => import('../components/EditBlog.vue'),
    meta: { requiresAuth: true }
  },
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAdminRoute = to.matched.some(record => record.meta.isAdmin);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userRole = sessionStorage.getItem('userRole');

  if (requiresAuth && !isLoggedIn) {
    next('/login');
  } else if (isAdminRoute && userRole !== 'Admin') {
    next('/');
  } else {
    next();
  }
});

export default router;

