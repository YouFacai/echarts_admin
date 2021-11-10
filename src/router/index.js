import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    component: () => import('../views/index.vue'),
    redirect: '/admin',
    children: [
      {
        path: '/admin',
        // component: () => import('../views/globalBar/globalBar.vue'),
        // component: () => import('../views/hotnation/hotnation.vue'),
        // component: () => import('../views/chainMap/chainMap.vue'),
        // component: () => import('../views/sector/sector.vue'),
        component: () => import('../views/allPicture/index.vue'),
      }
    ],
  },
  {
		path:'/:pathMatch(.*)',
    redirect: '/admin'
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
