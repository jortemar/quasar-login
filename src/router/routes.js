import authRouter from '../modules/auth/router/routes'
import stuffRouter from '../modules/stuff/router/routes'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),

    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
    ]
  },
  {
    path: '/auth',
    ...authRouter
  },
  {
    path: '/stuff',
    ...stuffRouter
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
