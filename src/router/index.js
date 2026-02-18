import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Users from '../views/Users.vue'
import Settings from '../views/Settings.vue'
import UserDetail from '../views/UserDetail.vue'
import Resources from '../views/Resources.vue'
import Groups from '../views/Groups.vue'
import Page from '../views/QualysStylePage.vue'


const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: Users },
  { path: '/Page', name: 'Page', component: Page },
  { path: '/groups', name: 'Groups', component: Groups },
  { path: '/resources', name: 'Resources', component: Resources },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/user/:id', name: 'UserDetail', component: UserDetail },  
  {
  path: '/pages/client-side',
  component: () => import('@/views/ClientSidePage.vue')
},
{
  path: '/pages/server-side',
  component: () => import('@/views/ServerSidePage.vue')
}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
