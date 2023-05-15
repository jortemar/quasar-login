import { useAuthStore } from '../../auth/stores/auth-store'
import authRoutes from '../../auth/router/routes'

export default {
  name: 'stuff',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    // { path: '', redirect: 'login' },
    {
      path: '/typography',
      name: 'typography',
      component: () => import('src/modules/stuff/pages/TypographyPage.vue')
    },
    {
      path: '/flex',
      name: 'flex',
      component: () => import('src/modules/stuff/pages/FlexPage.vue')
    },
    {
      path: '/dialogs',
      name: 'dialogs',
      component: () => import('src/modules/stuff/pages/DialogsPage.vue')
    },
    {
      path: '/forms',
      name: 'forms',
      component: () => import('src/modules/stuff/pages/FormsPage.vue')
    }
  ],
  beforeEnter: (to, from, next) => {
    const store = useAuthStore()

    if (store.status === 'authenticated') {
      next()
    } else {
      next('/login')   // esto hay que hacerlo bien
    }
  }
}
