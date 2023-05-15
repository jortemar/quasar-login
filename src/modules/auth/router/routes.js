
export default {
  name: 'auth',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    // { path: '', redirect: 'login' },
    {
      path: '',
      name: 'login',
      component: () => import('src/modules/auth/pages/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('src/modules/auth/pages/RegisterPage.vue')
      // component: () => import('../../../modules/auth/pages/RegisterPage.vue')
    }
  ]

}

