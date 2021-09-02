
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Login.vue') },
      { path: '/signup', component: () => import('pages/SignUp.vue') },
      { path: '/policies', component: () => import('pages/policies.vue') },
      { path: '/main', component: () => import('src/pages/main.vue') },
      { path: '/findPwd', component: () => import('src/pages/findPwd.vue') },
      { path: '/myInfo', component: () => import('src/pages/myInfo.vue') },
      { path: '/updatePwd', component: () => import('src/pages/updatePwd.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
