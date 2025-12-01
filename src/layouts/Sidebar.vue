<template>
  <div class="sidebar-inner">
   <!-- HEADER SECTION -->
    <div class="sidebar-header">
      <div class="logo-section d-flex align-center pa-3">
        <v-avatar size="32" class="mr-3">
  <img :src="profileImg" alt="Admin Profile" />
</v-avatar>
        <span v-if="!isRail" class="logo-text">Welcome Admin!</span>
      </div>
    </div>

    <v-divider class="sidebar-divider" />

    <!-- CLEAN NAVIGATION MENU -->
    <div class="navigation-section">
      <v-list density="compact" nav class="sidebar-menu">
        
        <!-- Dashboard -->
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

        <!-- Security Management Section -->
        <div class="menu-section">
          <v-list-item
            class="menu-header"
            @click="toggleSection('security')"
          >
          <v-tooltip activator="parent" location="right" open-delay="100">
    Security Management
  </v-tooltip>
            <template #prepend>
              <v-icon class="menu-icon" size="25">mdi-shield-account</v-icon>
            </template>
            <v-list-item-title v-if="!isRail" class="menu-text">Security Management</v-list-item-title>
            <template #append v-if="!isRail">
              <v-icon class="chevron" :class="{ rotated: expandedSection === 'security' }">
                mdi-chevron-down
              </v-icon>
            </template>
          </v-list-item>

          <transition name="slide" v-if="!isRail">
            <div v-if="expandedSection === 'security'" class="submenu">
              <v-list-item
                v-for="item in securityItems"
                :key="item.route"
                :to="item.route"
                class="submenu-item"
                active-class="submenu-active"
              >
                <template #prepend>
                  <v-icon class="submenu-icon">{{ item.icon }}</v-icon>
                </template>
                <v-list-item-title class="submenu-text">{{ item.label }}</v-list-item-title>
              </v-list-item>
            </div>
          </transition>
        </div>

        <!-- Threat Intelligence -->
        <div class="menu-section">
          <v-list-item
            class="menu-header"
            @click="toggleSection('threats')"
          >
          <v-tooltip activator="parent" location="right" open-delay="100">
    Threat Intelligence
  </v-tooltip>
            <template #prepend>
              <v-icon class="menu-icon" size="25">mdi-radar</v-icon>
            </template>
            <v-list-item-title v-if="!isRail" class="menu-text">Threat Intelligence</v-list-item-title>
            <template #append v-if="!isRail">
              <v-icon class="chevron" :class="{ rotated: expandedSection === 'threats' }">
                mdi-chevron-down
              </v-icon>
            </template>
          </v-list-item>

          <transition name="slide" v-if="!isRail">
            <div v-if="expandedSection === 'threats'" class="submenu">
              <v-list-item
                v-for="item in threatItems"
                :key="item.route"
                :to="item.route"
                class="submenu-item"
                active-class="submenu-active"
              >
                <template #prepend>
                  <v-icon class="submenu-icon">{{ item.icon }}</v-icon>
                </template>
                <v-list-item-title class="submenu-text">{{ item.label }}</v-list-item-title>
              </v-list-item>
            </div>
          </transition>
        </div>

        <!-- Compliance & Reporting -->
        <div class="menu-section">
          <v-list-item
            class="menu-header"
            @click="toggleSection('compliance')"
          >
          <v-tooltip activator="parent" location="right" open-delay="100">
    Compliance & Reporting
  </v-tooltip>
            <template #prepend>
              <v-icon class="menu-icon" size="25">mdi-file-document-check</v-icon>
            </template>
            <v-list-item-title v-if="!isRail" class="menu-text">Compliance</v-list-item-title>
            <template #append v-if="!isRail">
              <v-icon class="chevron" :class="{ rotated: expandedSection === 'compliance' }">
                mdi-chevron-down
              </v-icon>
            </template>
          </v-list-item>

          <transition name="slide" v-if="!isRail">
            <div v-if="expandedSection === 'compliance'" class="submenu">
              <v-list-item
                v-for="item in complianceItems"
                :key="item.route"
                :to="item.route"
                class="submenu-item"
                active-class="submenu-active"
              >
                <template #prepend>
                  <v-icon class="submenu-icon">{{ item.icon }}</v-icon>
                </template>
                <v-list-item-title class="submenu-text">{{ item.label }}</v-list-item-title>
              </v-list-item>
            </div>
          </transition>
        </div>

        <!-- Settings -->
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

const expandedSection = ref('')

const securityItems = [
  { label: 'Asset Inventory', route: '/security/assets', icon: 'mdi-server' },
  { label: 'Vulnerability Management', route: '/security/vulnerabilities', icon: 'mdi-bug-outline' },
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

const toggleSection = (section) => {
  expandedSection.value = expandedSection.value === section ? '' : section
}

watch(() => route.path, (newPath) => {
  if (props.isRail) return
  
  if (newPath.includes('/security')) {
    expandedSection.value = 'security'
  } else if (newPath.includes('/threats')) {
    expandedSection.value = 'threats'
  } else if (newPath.includes('/compliance')) {
    expandedSection.value = 'compliance'
  } else if (newPath === '/') {
    expandedSection.value = ''
  }
}, { immediate: true })

watch(() => props.isRail, (newVal) => {
  if (newVal) {
    expandedSection.value = ''
  }
})
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

.logo-content {
  line-height: 1.2;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
}

.logo-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 400;
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

/* Main Menu Items */
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

.menu-active .menu-icon {
  color: #ffffff !important;
}

.menu-active .menu-text {
  color: #ffffff !important;
  font-weight: 600;
}

/* Menu Headers */
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

.chevron {
  color: rgba(255, 255, 255, 0.8);
  transition: transform 0.2s ease;
  font-size: 18px;
}

.chevron.rotated {
  transform: rotate(180deg);
  color: #ffffff;
}

/* Submenu */
.submenu {
  background: #282828;
  border-left: 2px solid #ffffff;
  margin-left: 26px;
  overflow: hidden;
}

/* Slide Transition */
.slide-enter-active {
  transition: all 0.2s ease;
  max-height: 200px;
}

.slide-leave-active {
  transition: all 0.2s ease;
  max-height: 200px;
}

.slide-enter-from {
  opacity: 0;
  max-height: 0;
}

.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

/* Submenu Items */
.submenu-item {
  border-radius: 0;
  margin: 0;
  min-height: 40px;
  padding: 0 16px 0 14px;
  transition: background-color 0.2s ease;
}

.submenu-item:hover {
  background: #484644;
}

.submenu-active {
  background: #ffffff !important;
}

.submenu-active .submenu-icon {
  color: #ffffff !important;
}

.submenu-active .submenu-text {
  color: #ffffff !important;
  font-weight: 500;
}

.submenu-icon {
  color: rgba(255, 255, 255, 0.8) !important;
  margin-right: -30px;
  font-size: 18px;
  transition: color 0.2s ease;
}

.submenu-text {
  font-size: 13px;
  color: #ffffff !important;
  font-weight: 400;
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

.navigation-section::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}

/* Remove Vuetify default styles */
:deep(.v-list-item__prepend) {
  margin-right: 12px;
}

:deep(.v-list-item__append) {
  margin-left: 0;
}

:deep(.v-list-item__content) {
  padding: 0;
}

/* Rail mode adjustments */
:deep(.v-navigation-drawer--rail) .menu-text,
:deep(.v-navigation-drawer--rail) .chevron,
:deep(.v-navigation-drawer--rail) .submenu {
  display: none !important;
}

:deep(.v-navigation-drawer--rail) .menu-item,
:deep(.v-navigation-drawer--rail) .menu-header {
  justify-content: center;
  padding: 0 12px !important;
  min-height: 44px;
}

:deep(.v-navigation-drawer--rail) .menu-icon {
  margin-right: 0 !important;
}

/* Active state indicators */
.menu-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: #ffffff;
}

.submenu-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 2px;
  background: rgba(255, 255, 255, 0.3);
}

.v-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;   /* keeps proportions, crops if needed */
  border-radius: 50%;  /* ensures circular fit */
  display: block;
}
</style>