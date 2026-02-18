<template>
  <div class="sidebar-inner">
    <!-- HEADER SECTION -->
    <div class="sidebar-header">
      <div class="logo-section d-flex align-center pa-4">
        <v-avatar size="32" class="mr-3">
          <img :src="profileImg" alt="Admin Profile" />
        </v-avatar>
        <span v-if="!isRail" class="logo-text">Welcome Admin!</span>
      </div>
    </div>

    <v-divider class="sidebar-divider" />

    <!-- NAVIGATION MENU -->
    <div class="navigation-section">
      <v-list density="compact" nav class="sidebar-menu">
        
        <!-- Dashboard (no submenu) -->
        <v-list-item
          to="/"
          class="menu-item"
          active-class="menu-active"
        >
          <v-tooltip activator="parent" location="right" open-delay="100">
            Dashboard
          </v-tooltip>
          <template #prepend>
            <v-icon class="menu-icon" size="25">mdi-view-dashboard</v-icon>
          </template>
          <v-list-item-title v-if="!isRail" class="menu-text">Dashboard</v-list-item-title>
        </v-list-item>

        <!-- Security Management Section (with submenu) -->
        <div class="menu-section">
          <v-list-item
            class="menu-header"
            :class="{ 'menu-active': activeSubMenu === 'security' }"
            @click="openSubsidebar('security')"
          >
            <v-tooltip activator="parent" location="right" open-delay="100">
              Security Management
            </v-tooltip>
            <template #prepend>
              <v-icon class="menu-icon" size="25">mdi-shield-account</v-icon>
            </template>
            <v-list-item-title v-if="!isRail" class="menu-text">Security Management</v-list-item-title>
            
            <!-- Right arrow icon to tease subsidebar (always visible in full mode) -->
            <template #append v-if="!isRail">
              <v-icon class="submenu-arrow" size="18">mdi-chevron-right</v-icon>
            </template>
          </v-list-item>

          <!-- REMOVED the inline submenu - now handled by SubSidebar -->
        </div>

        <!-- Threat Intelligence Section (with submenu) -->
        <div class="menu-section">
          <v-list-item
            class="menu-header"
            :class="{ 'menu-active': activeSubMenu === 'threats' }"
            @click="openSubsidebar('threats')"
          >
            <v-tooltip activator="parent" location="right" open-delay="100">
              Threat Intelligence
            </v-tooltip>
            <template #prepend>
              <v-icon class="menu-icon" size="25">mdi-radar</v-icon>
            </template>
            <v-list-item-title v-if="!isRail" class="menu-text">Threat Intelligence</v-list-item-title>
            <template #append v-if="!isRail">
              <v-icon class="submenu-arrow" size="18">mdi-chevron-right</v-icon>
            </template>
          </v-list-item>
        </div>

        <!-- Compliance Section (with submenu) -->
        <div class="menu-section">
          <v-list-item
            class="menu-header"
            :class="{ 'menu-active': activeSubMenu === 'compliance' }"
            @click="openSubsidebar('compliance')"
          >
            <v-tooltip activator="parent" location="right" open-delay="100">
              Compliance & Reporting
            </v-tooltip>
            <template #prepend>
              <v-icon class="menu-icon" size="25">mdi-file-document-check</v-icon>
            </template>
            <v-list-item-title v-if="!isRail" class="menu-text">Compliance</v-list-item-title>
            <template #append v-if="!isRail">
              <v-icon class="submenu-arrow" size="18">mdi-chevron-right</v-icon>
            </template>
          </v-list-item>
        </div>

        <!-- Pages Section (with submenu) -->
        <div class="menu-section">
          <v-list-item
            class="menu-header"
            :class="{ 'menu-active': activeSubMenu === 'pages' }"
            @click="openSubsidebar('pages')"
          >
            <v-tooltip activator="parent" location="right" open-delay="100">
              Pages
            </v-tooltip>
            <template #prepend>
              <v-icon class="menu-icon" size="25">mdi-file-multiple</v-icon>
            </template>
            <v-list-item-title v-if="!isRail" class="menu-text">Pages</v-list-item-title>
            <template #append v-if="!isRail">
              <v-icon class="submenu-arrow" size="18">mdi-chevron-right</v-icon>
            </template>
          </v-list-item>
        </div>

        <!-- Settings (no submenu) -->
        <v-list-item
          to="/settings"
          class="menu-item"
          active-class="menu-active"
        >
          <v-tooltip activator="parent" location="right" open-delay="100">
            Settings
          </v-tooltip>
          <template #prepend>
            <v-icon class="menu-icon" size="25">mdi-cog</v-icon>
          </template>
          <v-list-item-title v-if="!isRail" class="menu-text">Settings</v-list-item-title>
        </v-list-item>

      </v-list>
    </div>

    <!-- SIDEBAR FOOTER -->
    <div class="sidebar-footer" v-if="!isRail">
      <v-divider />
      <div class="footer-content pa-3">
        <div class="security-status">
          <v-icon color="#107c10" size="16" class="mr-2">mdi-shield-check</v-icon>
          <span class="status-text">All Systems Operational</span>
        </div>
        <div class="last-update">Updated 2 min ago</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import profileImg from '../assets/Profile.png'

const route = useRoute()

const props = defineProps({
  isRail: { type: Boolean, default: false }
})

const emit = defineEmits(['show-submenu', 'close-subsidebar'])

// Track which submenu is active (for highlighting)
const activeSubMenu = ref('')

// Menu items data (kept for reference but submenu is handled by SubSidebar)
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

// Open subsidebar
const openSubsidebar = (menuType) => {
  activeSubMenu.value = menuType
  emit('show-submenu', menuType)
}

// Watch route to update active submenu based on URL
watch(() => route.path, (newPath) => {
  if (newPath.includes('/security')) {
    activeSubMenu.value = 'security'
  } else if (newPath.includes('/threats')) {
    activeSubMenu.value = 'threats'
  } else if (newPath.includes('/compliance')) {
    activeSubMenu.value = 'compliance'
  } else if (newPath.includes('/pages')) {
    activeSubMenu.value = 'pages'
  } else {
    activeSubMenu.value = ''
  }
}, { immediate: true })

// Listen for subsidebar close event (from parent)
// This would be handled by parent via prop/event
</script>

<style scoped>
.sidebar-inner {
  height: 100%;
  background: #323130;
  border-right: 2px solid #484644;
  display: flex;
  flex-direction: column;
}

/* Header Section */
.sidebar-header {
  background: #212121;
}

.logo-section {
  min-height: 80px;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
}

.sidebar-divider {
  margin: 0;
  border-color: #484644;
}

/* Navigation Section */
.navigation-section {
  flex: 1;
  overflow-y: auto;
  padding: 0px 0;
  background: #212121;
}

.sidebar-menu {
  padding: 0 !important;
}

/* Menu Sections */
.menu-section {
  margin-bottom: 7px;
}

/* Main Menu Items (no submenu) */
.menu-item {
  border-radius: 0;
  margin: 0;
  min-height: 44px;
  padding: 16px;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background: #3b3a39;
}

.menu-active {
  background: #3d3b3b !important;
  border-right: 2px solid #ffffff;
}

.menu-active .menu-icon,
.menu-active .menu-text {
  color: #ffffff !important;
}

/* Menu Headers (with submenu) */
.menu-header {
  border-radius: 0;
  margin: 0;
  min-height: 44px;
  padding: 13px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.menu-header:hover {
  background: #3b3a39;
}

.menu-header:hover .menu-icon {
  color: #ffffff !important;
}

.menu-header:hover .submenu-arrow {
  color: #ffffff !important;
  transform: translateX(2px);
}

.menu-icon {
  color: rgba(255, 255, 255, 0.8) !important;
  margin-right: -25px;
  font-size: 20px;
  transition: color 0.2s ease;
}

.menu-text {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff !important;
}

/* Right arrow for submenu teaser */
.submenu-arrow {
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.2s ease;
  font-size: 18px;
}

.menu-header:hover .submenu-arrow {
  color: #ffffff;
  transform: translateX(3px);
}

/* Active state for menu headers */
.menu-header.menu-active {
  background: #3d3b3b !important;
  border-right: 2px solid #ffffff;
}

.menu-header.menu-active .menu-icon,
.menu-header.menu-active .menu-text,
.menu-header.menu-active .submenu-arrow {
  color: #ffffff !important;
}

/* Sidebar Footer */
.sidebar-footer {
  background: #3b3a39;
  border-top: 1px solid #484644;
}

.footer-content {
  text-align: center;
  padding: 16px;
}

.security-status {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.status-text {
  font-size: 12px;
  font-weight: 500;
  color: #107c10;
}

.last-update {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
}

/* Scrollbar */
.navigation-section::-webkit-scrollbar {
  width: 4px;
}

.navigation-section::-webkit-scrollbar-track {
  background: #3b3a39;
}

.navigation-section::-webkit-scrollbar-thumb {
  background: #ffffff;
  border-radius: 2px;
}

/* Rail Mode Styles */
:deep(.v-navigation-drawer--rail) .menu-text,
:deep(.v-navigation-drawer--rail) .submenu-arrow,
:deep(.v-navigation-drawer--rail) .submenu,
:deep(.v-navigation-drawer--rail) .sidebar-footer,
:deep(.v-navigation-drawer--rail) .logo-text {
  display: none !important;
}

:deep(.v-navigation-drawer--rail) .menu-item,
:deep(.v-navigation-drawer--rail) .menu-header {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 0 !important;
  min-height: 48px !important;
}

:deep(.v-navigation-drawer--rail) .v-list-item__prepend {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

:deep(.v-navigation-drawer--rail) .menu-icon {
  margin-right: 0 !important;
  font-size: 22px !important;
}

:deep(.v-navigation-drawer--rail) .v-list-item__content,
:deep(.v-navigation-drawer--rail) .v-list-item__append {
  display: none !important;
}

:deep(.v-navigation-drawer--rail) .sidebar-header {
  padding: 8px 0 !important;
  display: flex !important;
  justify-content: center !important;
}

:deep(.v-navigation-drawer--rail) .logo-section {
  justify-content: center !important;
  padding: 8px 0 !important;
}

:deep(.v-navigation-drawer--rail) .v-avatar {
  margin-right: 0 !important;
}

/* In rail mode, tooltip still works for all items */
:deep(.v-navigation-drawer--rail) .v-tooltip {
  display: block !important;
}

/* Active state indicators */
.menu-active::before,
.menu-header.menu-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: #ffffff;
}

/* Avatar image */
.v-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}

/* Fix for prepend slot */
.v-list-item__prepend {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 40px;
}
</style>