import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/',           redirect: '/dashboard' },
  { path: '/dashboard',  component: () => import('../views/DashboardView.vue'), meta: { auth: true } },
  { path: '/assets',     component: () => import('../views/AssetsView.vue'),    meta: { auth: true } },
  { path: '/family',     component: () => import('../views/FamilyView.vue'),    meta: { auth: true } },
  { path: '/recon',      component: () => import('../views/ReconciliationView.vue'), meta: { auth: true } },
  { path: '/vault',      component: () => import('../views/VaultView.vue'),     meta: { auth: true } },
  { path: '/analysis',   component: () => import('../views/AnalysisView.vue'),  meta: { auth: true } },
  { path: '/settings',   component: () => import('../views/SettingsView.vue'),  meta: { auth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.auth && !auth.isLoggedIn) return false
})

export default router
