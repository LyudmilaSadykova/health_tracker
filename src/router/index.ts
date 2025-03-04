import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SettingsView from '../views/SettingsView.vue'
import WatherBalanceView from '../views/WatherBalanceView.vue'
import CalorificView from '../views/CalorificView.vue'
import ActivityView from '../views/ActivityView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/wather_balance',
      name: 'wather_balance',
      component: WatherBalanceView,
    },
    {
      path: '/activity',
      name: 'activity',
      component: ActivityView,
    },
    {
      path: '/calorific',
      name: 'calorific',
      component: CalorificView,
    },
  ]
})

export default router;
