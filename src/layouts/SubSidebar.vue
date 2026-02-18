<template>
  <div class="subsidebar-content" v-if="menuType">
    <!-- HEADER with Icon + Title + Close -->
    <div class="subsidebar-header">
      <div class="subsidebar-title-container">
        <v-icon class="subsidebar-header-icon" :color="headerIconColor">
          {{ getHeaderIcon() }}
        </v-icon>
        <span class="subsidebar-title">{{ getTitle() }}</span>
      </div>
      <v-btn
        icon
        variant="text"
        size="small"
        class="subsidebar-close"
        @click="handleClose"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <!-- MENU ITEMS based on menuType -->
    <div class="subsidebar-menu">
      <div class="subsidebar-menu-container">
        <!-- Security Management Items -->
        <template v-if="menuType === 'security'">
          <div
            v-for="item in securityItems"
            :key="item.route"
            class="subsidebar-item"
            :class="{ active: isActive(item.route) }"
            @click="navigateTo(item.route)"
          >
            <v-icon class="subsidebar-icon">{{ item.icon }}</v-icon>
            <span class="subsidebar-text">{{ item.label }}</span>
          </div>
        </template>

        <!-- Threat Intelligence Items -->
        <template v-if="menuType === 'threats'">
          <div
            v-for="item in threatItems"
            :key="item.route"
            class="subsidebar-item"
            :class="{ active: isActive(item.route) }"
            @click="navigateTo(item.route)"
          >
            <v-icon class="subsidebar-icon">{{ item.icon }}</v-icon>
            <span class="subsidebar-text">{{ item.label }}</span>
          </div>
        </template>

        <!-- Compliance Items -->
        <template v-if="menuType === 'compliance'">
          <div
            v-for="item in complianceItems"
            :key="item.route"
            class="subsidebar-item"
            :class="{ active: isActive(item.route) }"
            @click="navigateTo(item.route)"
          >
            <v-icon class="subsidebar-icon">{{ item.icon }}</v-icon>
            <span class="subsidebar-text">{{ item.label }}</span>
          </div>
        </template>

        <!-- Pages Items -->
        <template v-if="menuType === 'pages'">
          <div
            v-for="item in pagesItems"
            :key="item.route"
            class="subsidebar-item"
            :class="{ active: isActive(item.route) }"
            @click="navigateTo(item.route)"
          >
            <v-icon class="subsidebar-icon">{{ item.icon }}</v-icon>
            <span class="subsidebar-text">{{ item.label }}</span>
          </div>
        </template>

        <!-- Empty State -->
        <div v-if="!menuType" class="subsidebar-empty">
          <v-icon size="40" color="rgba(255,255,255,0.3)">mdi-menu-right</v-icon>
          <span class="empty-text">Select a menu item</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  menuType: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const route = useRoute()
const router = useRouter()

// ===== MENU ITEMS (from your existing Vuetify sidebar) =====
const securityItems = [
  { label: 'Asset Inventory', route: '/page', icon: 'mdi-server' },
  { label: 'Vulnerability Management', route: '/groups', icon: 'mdi-bug-outline' },
  { label: 'Security Policies', route: '/security/policies', icon: 'mdi-shield-check' },
  { label: 'Access Control', route: '/security/access', icon: 'mdi-key-chain' }
]

const threatItems = [
  { label: 'Threat Detection', route: '/threats/detection', icon: 'mdi-radar' },
  { label: 'Incident Response', route: '/threats/incidents', icon: 'mdi-alert-circle' },
  { label: 'Threat Hunting', route: '/threats/hunting', icon: 'mdi-magnify' },
  { label: 'IOC Management', route: '/threats/iocs', icon: 'mdi-brain' }
]

const complianceItems = [
  { label: 'Compliance Dashboard', route: '/compliance/dashboard', icon: 'mdi-view-dashboard' },
  { label: 'Audit Logs', route: '/compliance/audit', icon: 'mdi-clipboard-text' },
  { label: 'Reports', route: '/compliance/reports', icon: 'mdi-file-chart' },
  { label: 'Standards', route: '/compliance/standards', icon: 'mdi-certificate' }
]

const pagesItems = [
  { label: 'Client Side Page', route: '/pages/client-side', icon: 'mdi-monitor' },
  { label: 'Server Side Page', route: '/pages/server-side', icon: 'mdi-server-network' }
]

// ===== HEADER ICONS AND TITLES =====
const headerIconColor = ref('#ffffff')

const getHeaderIcon = () => {
  switch (props.menuType) {
    case 'security':
      return 'mdi-shield-account'
    case 'threats':
      return 'mdi-radar'
    case 'compliance':
      return 'mdi-file-document-check'
    case 'pages':
      return 'mdi-file-multiple'
    default:
      return 'mdi-menu'
  }
}

const getTitle = () => {
  switch (props.menuType) {
    case 'security':
      return 'Security Management'
    case 'threats':
      return 'Threat Intelligence'
    case 'compliance':
      return 'Compliance & Reporting'
    case 'pages':
      return 'Pages'
    default:
      return 'Sub Menu'
  }
}

// ===== ACTIVE STATE DETECTION =====
const isActive = (itemRoute) => {
  const currentPath = route.path
  
  // Exact match
  if (currentPath === itemRoute) return true
  
  // For routes with sub-pages (like /security/policies vs /security/policies/details)
  if (itemRoute !== '/' && currentPath.startsWith(itemRoute + '/')) return true
  
  return false
}

// ===== NAVIGATION =====
const navigateTo = async (url) => {
  try {
    // 1. Close subsidebar immediately (like MudBlazor)
    emit('close')
    
    // 2. Small delay for smooth transition (like MudBlazor's 30ms)
    await new Promise(resolve => setTimeout(resolve, 30))
    
    // 3. Navigate
    await router.push(url)
  } catch (error) {
    console.error('Navigation error:', error)
  }
}

// ===== CLOSE HANDLER =====
const handleClose = () => {
  emit('close')
}

// ===== ROUTE CHANGE DETECTION (for active states) =====
// No need for extra watch since isActive uses route.path reactively
</script>

<style scoped>
.subsidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #212121;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  width: 260px; /* Fixed width like MudBlazor subsidebar */
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Header */
.subsidebar-header {
  padding: 20px 24px;
  background: #212121;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.subsidebar-title-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.subsidebar-header-icon {
  font-size: 28px !important;
  color: #ffffff !important;
}

.subsidebar-title {
  font-size: 17px !important;
  font-weight: 600 !important;
  color: #ffffff !important;
  letter-spacing: 0.2px;
}

.subsidebar-close {
  color: rgba(255, 255, 255, 0.7) !important;
  border-radius: 6px;
  padding: 4px;
  transition: all 0.2s ease;
}

.subsidebar-close:hover {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
  transform: rotate(90deg);
}

/* Menu Container */
.subsidebar-menu {
  flex: 1;
  padding: 16px 8px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.subsidebar-menu::-webkit-scrollbar {
  width: 6px;
}

.subsidebar-menu::-webkit-scrollbar-track {
  background: transparent;
}

.subsidebar-menu::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}

.subsidebar-menu::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.subsidebar-menu-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 8px;
  margin: 0 -8px;
}

/* Menu Items */
.subsidebar-item {
  min-height: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin: 0 -8px;
  border-radius: 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: 14.5px;
  font-weight: 450;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  background-color: transparent;
  width: calc(100% + 16px);
}

.subsidebar-item:hover {
  background: rgba(255, 255, 255, 0.08) !important;
  color: white !important;
  transform: none;
  margin: 0 -8px;
  width: calc(100% + 16px);
}

/* Active State */
.subsidebar-item.active {
  background-color: #FAFAFA !important;
  color: #212121 !important;
  border-left: 3px solid #FAFAFA !important;
  font-weight: 600 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  margin: 0 -8px;
  width: calc(100% + 16px);
}

.subsidebar-item.active:hover {
  background-color: #F5F5F5 !important;
  color: #212121 !important;
}

/* Icons */
.subsidebar-icon {
  margin-right: 12px !important;
  font-size: 20px !important;
  min-width: 24px;
  transition: color 0.2s ease;
  color: rgba(255, 255, 255, 0.9) !important;
}

.subsidebar-item.active .subsidebar-icon {
  color: #212121 !important;
}

/* Text */
.subsidebar-text {
  flex: 1;
  line-height: 1.3;
  font-weight: 450;
  color: inherit !important;
}

.subsidebar-item.active .subsidebar-text {
  color: #212121 !important;
  font-weight: 600 !important;
}

/* Item dividers */
.subsidebar-item:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.subsidebar-item.active:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

/* Empty State */
.subsidebar-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding: 20px;
  gap: 12px;
}

.empty-text {
  font-size: 15px;
  font-weight: 450;
}

/* Responsive */
@media (max-width: 960px) {
  .subsidebar-header {
    padding: 16px 20px;
  }
  
  .subsidebar-title {
    font-size: 16px !important;
  }
  
  .subsidebar-menu {
    padding: 12px 8px;
  }
}
</style>