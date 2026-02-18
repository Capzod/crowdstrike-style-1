<template>
  <v-app>
    <Topbar @toggle-drawer="toggleSidebarRail" @toggle-notify="toggleNotifyDrawer" />

    <!-- LEFT SIDEBAR RAIL - with increased rail width -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="isRail"
      permanent
      app
      width="250"
      rail-width="65"
      class="main-sidebar"
    >
      <Sidebar 
        :is-rail="isRail" 
        :pinned="pinned" 
        @toggle-pin="togglePin"
        @show-submenu="handleShowSubmenu"
      />
    </v-navigation-drawer>

    <!-- SUB-SIDEBAR - appears when a menu item with submenu is clicked -->
    <v-navigation-drawer
      v-if="activeSubMenu"
      :width="260"
      location="left"
      temporary
      :model-value="!!activeSubMenu"
      @update:model-value="closeSubsidebar"
      class="sub-sidebar"
    >
      <SubSidebar 
        :menu-type="activeSubMenu"
        @close="closeSubsidebar"
      />
    </v-navigation-drawer>

    <!-- RIGHT NOTIFICATION DRAWER -->
    <v-navigation-drawer 
      v-model="notifyDrawer" 
      location="right" 
      temporary 
      width="360"
      app
    >
      <div class="notification-header pa-4">
        <div class="d-flex align-center">
          <v-icon size="24" color="#1a237e" class="mr-2">mdi-notifications</v-icon>
          <span class="text-h6 font-weight-medium">Notifications</span>
          <v-spacer></v-spacer>
          <v-badge v-if="unreadCount > 0" :content="unreadCount" color="error"></v-badge>
        </div>
        <div class="text-caption text-medium-emphasis mt-1">System alerts and updates</div>
      </div>
      
      <v-divider />
      
      <div class="notification-list">
        <v-list class="py-0">
          <v-list-item
            v-for="n in notifications"
            :key="n.id"
            @click="markAsRead(n.id)"
            class="notification-item"
            :class="{ 'notification-unread': !n.read }"
          >
            <template #prepend>
              <v-avatar size="40" :color="getNotificationColor(n.type)" class="mr-3">
                <v-icon size="18" color="white">{{ getNotificationIcon(n.type) }}</v-icon>
              </v-avatar>
            </template>
            
            <v-list-item-title class="text-body-2 font-weight-medium mb-1">
              {{ n.title }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-caption text-medium-emphasis">
              {{ n.message }}
            </v-list-item-subtitle>
            
            <template #append>
              <div class="text-right">
                <div class="text-caption text-medium-emphasis">{{ n.time }}</div>
                <v-icon 
                  v-if="!n.read" 
                  size="12" 
                  color="primary" 
                  class="mt-1"
                >mdi-circle</v-icon>
              </div>
            </template>
          </v-list-item>
        </v-list>
        
        <div v-if="notifications.length === 0" class="text-center py-8">
          <v-icon size="48" color="grey-lighten-2" class="mb-2">mdi-bell-off-outline</v-icon>
          <div class="text-body-2 text-medium-emphasis">No notifications</div>
        </div>
      </div>
    </v-navigation-drawer>

    <!-- MAIN CONTENT - Fixed scrolling -->
    <v-main class="portal-main">
      <v-container fluid class="pa-0 fill-height">
        <router-view v-slot="{ Component }">
          <component :is="Component || ComingSoon" />
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Topbar from './Topbar.vue'
import Sidebar from './Sidebar.vue'
import SubSidebar from './SubSidebar.vue' // SubSidebar
import bus from '../styles/eventBus'
import ComingSoon from '../views/ComingSoon.vue'

// Shared sidebar state
const drawer = ref(true)
const isRail = ref(true)
const pinned = ref(false)

// SubSidebar state
const activeSubMenu = ref('')

// Shared notifications state
const notifyDrawer = ref(false)
const notifications = ref([])

// Initialize with mock notifications
onMounted(() => {
  notifications.value = [
    // Your notifications here
  ]
})

// Computed
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

// Pin logic
const togglePin = () => {
  pinned.value = !pinned.value
  isRail.value = pinned.value ? false : true
}

// ===== SUB-SIDEBAR METHODS =====
const handleShowSubmenu = (menuType) => {
  activeSubMenu.value = menuType
}

const closeSubsidebar = () => {
  activeSubMenu.value = ''
}

// Notification listener
bus.on('user-action', (payload) => {
  notifications.value.unshift({ 
    id: Date.now(), 
    type: payload.type || 'info',
    title: payload.title || 'Notification',
    message: payload.message || '',
    time: 'just now',
    read: false,
    ...payload 
  })
})

// Drawer open = seen
const toggleNotifyDrawer = () => {
  notifyDrawer.value = !notifyDrawer.value
}

// Each item click = mark read
const markAsRead = (id) => {
  const n = notifications.value.find(n => n.id === id)
  if (n) n.read = true
}

// Hamburger flips rail but never hides sidebar
const toggleSidebarRail = () => {
  isRail.value = !isRail.value
}

// Notification helpers
const getNotificationColor = (type) => {
  const colors = {
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336'
  }
  return colors[type] || '#757575'
}

const getNotificationIcon = (type) => {
  const icons = {
    info: 'mdi-information',
    success: 'mdi-check-circle',
    warning: 'mdi-alert',
    error: 'mdi-alert-circle'
  }
  return icons[type] || 'mdi-bell'
}
</script>

<style scoped>
/* Main sidebar styling */
.main-sidebar {
  background: #212121 !important;
  border-right: 2px solid #484644 !important;
}

/* Sub-sidebar styling */
.sub-sidebar {
  background: #212121 !important;
  border-right: 2px solid #484644 !important;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.3) !important;
  z-index: 1004 !important; /* Above main sidebar but below modals */
}

/* Ensure proper positioning */
:deep(.v-navigation-drawer--temporary) {
  z-index: 1004 !important;
}

/* Main layout fixes */
.v-app {
  height: 100vh;
  overflow: hidden;
}

.portal-main {
  background: #f5f5f5;
  height: 100vh;
  overflow-y: auto;
  padding-top: 70px !important; /* Match topbar height */
}

.fill-height {
  height: 100%;
}

/* Ensure proper spacing for the main content */
:deep(.v-main__wrap) {
  height: 100%;
}

:deep(.container) {
  height: 100%;
  max-width: 100%;
}

/* Fix for router-view content */
:deep(.router-view) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Rail mode width adjustment */
:deep(.v-navigation-drawer--rail) {
  width: 65px !important;
}

:deep(.v-navigation-drawer--rail .v-list-item) {
  padding-left: 18px !important;
  padding-right: 18px !important;
}

/* Notification Styles */
.notification-header {
  background: #fafafa;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 1;
}

.notification-list {
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  height: 100%;
}

.notification-item {
  border-bottom: 1px solid #f5f5f5;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.notification-item:hover {
  background: #f5f5f5;
}

.notification-unread {
  background: #f3f8ff;
}

.notification-unread:hover {
  background: #e8eaf6;
}

/* Custom scrollbar */
:deep(.v-navigation-drawer__content) {
  scrollbar-width: thin;
}

:deep(.v-navigation-drawer__content::-webkit-scrollbar) {
  width: 6px;
}

:deep(.v-navigation-drawer__content::-webkit-scrollbar-thumb) {
  background-color: #e0e0e0;
  border-radius: 3px;
}

:deep(.v-navigation-drawer__content::-webkit-scrollbar-track) {
  background: #f5f5f5;
}

/* Main content scrollbar */
.portal-main::-webkit-scrollbar {
  width: 8px;
}

.portal-main::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 4px;
}

.portal-main::-webkit-scrollbar-track {
  background: #f5f5f5;
}

/* Ensure sidebar stays fixed */
.main-sidebar {
  position: fixed !important;
  top: 75px !important; /* Match topbar height */
  height: calc(100vh - 64px) !important;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .portal-main {
    padding-top: 56px !important; /* Mobile topbar height */
  }
  
  .main-sidebar {
    top: 56px !important;
    height: calc(100vh - 56px) !important;
  }
}
</style>