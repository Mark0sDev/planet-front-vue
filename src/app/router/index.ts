import { createRouter, createWebHistory } from 'vue-router'
import { AppRoutes } from '@/app/router/router.ts'

import HomePage from '@/pages/HomePage.vue'
import LeadersPage from '@/pages/LeadersPage.vue'
import FriendsPage from '@/pages/FriendsPage.vue'
import TasksPage from '@/pages/TasksPage.vue'
import BalancePage from '@/pages/BalancePage.vue'
import PlanetsPage from '@/pages/PlanetsPage.vue'
import FAQPage from '@/pages/FAQPage/FAQPage.vue'
import RoulettePage from '@/pages/RoulettePage.vue'

const routes = [
  { path: AppRoutes.HOME, component: HomePage },
  { path: AppRoutes.LEADERS, component: LeadersPage },
  { path: AppRoutes.FRIENDS, component: FriendsPage },
  { path: AppRoutes.TASKS, component: TasksPage },
  { path: AppRoutes.BALANCE, component: BalancePage },
  { path: AppRoutes.PLANETS, component: PlanetsPage },
  { path: AppRoutes.FAQ, component: FAQPage },
  { path: AppRoutes.ROULETTE, component: RoulettePage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
