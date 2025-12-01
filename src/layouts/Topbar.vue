<template>
  <v-app-bar flat height="75" class="portal-topbar">
    <!-- LEFT: BRAND & NAVIGATION -->
    <div class="d-flex align-center brand-section">
      <v-btn 
        icon 
        variant="text" 
        @click="$emit('toggle-drawer')"
        class="menu-btn mr-2"
      >
        <v-icon color="white" size="25" class="mr-0">mdi-menu</v-icon>
      </v-btn>

      <div class="brand-wrapper">
  <img :src="syngentaLogo" alt="Syngenta Logo" class="brand-logo" /> </div>
      </div>

    <!-- CENTER: PRIMARY NAVIGATION -->
    <div class="primary-nav-section">
      <v-tabs v-model="activeTab" color="#0078d4" class="primary-tabs">
        <v-tab 
          v-for="item in navItems" 
          :key="item.name"
          :value="item.route"
          @click="router.push(item.route)"
          class="primary-tab"
        >
          <v-icon size="18" class="mr-2">{{ item.icon }}</v-icon>
          {{ item.name }}
          <v-badge 
            v-if="item.badge" 
            :content="item.badge" 
            color="#d13438" 
            inline 
            class="ml-2 nav-badge"
          ></v-badge>
        </v-tab>
      </v-tabs>
    </div>

    <!-- RIGHT: ACTIONS & PROFILE -->
    <div class="d-flex align-center action-section">
      <!-- QUICK ACTIONS -->
      <div class="quick-actions">
        <v-btn 
          variant="outlined" 
          size="small" 
          color="#0078d4"
          class="quick-action-btn"
          @click="handleNewCase"
        >
          <v-icon size="18" class="mr-1">mdi-plus</v-icon>
          New Case
        </v-btn>
        <v-btn 
          variant="outlined" 
          size="small" 
          color="#0078d4"
          class="quick-action-btn ml-2"
        >
          <v-icon size="18" class="mr-1">mdi-download</v-icon>
          Export
        </v-btn>
      </div>

      <v-divider vertical class="mx-4 divider" />

      <!-- SEARCH -->
      <v-text-field
        density="compact"
        variant="outlined"
        placeholder="Search threats, endpoints..."
        prepend-inner-icon="mdi-magnify"
        hide-details
        class="search-field"
      ></v-text-field>

      <!-- NOTIFICATIONS & PROFILE -->
      <div class="user-actions">
        <v-btn 
          icon 
          variant="text" 
          @click="$emit('toggle-notify')"
          class="action-btn mx-1"
        >
          <v-badge
            :content="unreadCount"
            :model-value="unreadCount > 0"
            color="#d13438"
            dot
            overlap
          >
            <v-icon color="white" size="24">mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>

        <v-menu location="bottom end" offset="8">
          <template v-slot:activator="{ props }">
            <v-btn 
              variant="text" 
              class="user-profile-btn d-flex align-center"
              v-bind="props"
            >
              <v-avatar size="36" class="mr-2">
  <img :src="profileImg" alt="Admin Profile" />
</v-avatar>
              <div class="user-info">
                <div class="user-name">Security Admin</div>
                <div class="user-role">Administrator</div>
              </div>
              <v-icon color="#605e5c" size="18" class="ml-2">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list density="compact" class="profile-menu">
            <v-list-item @click="router.push('/profile')">
              <template #prepend>
                <v-icon size="20" color="#605e5c">mdi-account-outline</v-icon>
              </template>
              <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="router.push('/settings')">
              <template #prepend>
                <v-icon size="20" color="#605e5c">mdi-cog-outline</v-icon>
              </template>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
            <v-divider class="my-2" />
            <v-list-item @click="handleLogout">
              <template #prepend>
                <v-icon size="20" color="#605e5c">mdi-logout</v-icon>
              </template>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-app-bar>

  <!-- SECONDARY NAVIGATION BAR -->
  <div class="secondary-nav-bar">
    <div class="secondary-nav-content">
      <!-- FILTERS SECTION -->
      <div class="filters-section">
        <span class="filters-label">View:</span>
        
        <v-btn-toggle v-model="viewType" color="#0078d4" class="view-toggle">
          <v-btn value="overview" size="small" class="view-btn">
            <v-icon size="16" class="mr-1">mdi-view-dashboard</v-icon>
            Overview
          </v-btn>
          <v-btn value="detailed" size="small" class="view-btn">
            <v-icon size="16" class="mr-1">mdi-format-list-bulleted</v-icon>
            Detailed
          </v-btn>
          <v-btn value="analytics" size="small" class="view-btn">
            <v-icon size="16" class="mr-1">mdi-chart-bar</v-icon>
            Analytics
          </v-btn>
        </v-btn-toggle>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn 
              variant="outlined" 
              size="small" 
              color="#323130"
              v-bind="props"
              class="time-filter-btn"
            >
              <v-icon size="16" class="mr-1">mdi-clock-outline</v-icon>
              {{ getTimeFilterLabel(selectedTimeFilter) }}
              <v-icon size="16" class="ml-1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item 
              v-for="time in timeFilters" 
              :key="time.value" 
              @click="selectedTimeFilter = time.value"
            >
              <v-list-item-title>{{ time.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- QUICK FILTERS -->
      <div class="quick-filters-section">
        <v-chip
          v-for="filter in quickFilters"
          :key="filter.label"
          :color="filter.active ? '#0078d4' : 'default'"
          :variant="filter.active ? 'flat' : 'outlined'"
          size="small"
          class="quick-filter-chip"
          @click="toggleFilter(filter)"
        >
          {{ filter.label }}
        </v-chip>

        <v-btn 
          variant="text" 
          size="small" 
          color="#0078d4"
          class="refresh-btn"
          @click="refreshData"
        >
          <v-icon size="16" class="mr-1">mdi-refresh</v-icon>
          Refresh
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import syngentaLogo from '../assets/Logo-2.png'
import profileImg from '../assets/Profile.png' 


const router = useRouter()

const emit = defineEmits(['toggle-drawer','toggle-notify'])

const unreadCount = computed(() => 3)

const handleLogout = () => {
  console.log('Logout clicked')
  router.push('/login')
}

const handleNewCase = () => {
  console.log('Creating new case...')
}

// Navigation
const activeTab = ref('/')
const navItems = ref([
  { name: 'Dashboard', route: '/', icon: 'mdi-view-dashboard', badge: null },
  { name: 'Assets', route: '/assets', icon: 'mdi-server', badge: '12' },
  { name: 'Security Posture', route: '/posture', icon: 'mdi-shield-check', badge: '3' },
  { name: 'Threat Detection', route: '/detections', icon: 'mdi-radar', badge: '24' },
  { name: 'Vulnerabilities', route: '/vulnerabilities', icon: 'mdi-bug-outline', badge: '8' },
  { name: 'Compliance', route: '/compliance', icon: 'mdi-file-document-check', badge: null }
])

// Filters
const selectedTimeFilter = ref('24h')
const timeFilters = ref([
  { label: 'Last 1 Hour', value: '1h' },
  { label: 'Last 6 Hours', value: '6h' },
  { label: 'Last 24 Hours', value: '24h' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' }
])

const viewType = ref('overview')
const quickFilters = ref([
  { label: 'Critical', active: true },
  { label: 'Active', active: false },
  { label: 'Unresolved', active: true }
])

// Methods
const getTimeFilterLabel = (value) => {
  const filter = timeFilters.value.find(f => f.value === value)
  return filter ? filter.label : 'Last 24 Hours'
}

const toggleFilter = (filter) => {
  filter.active = !filter.active
}

const refreshData = () => {
  console.log('Refreshing data...')
}
</script>

<style scoped>
.portal-topbar {
  background: #212121 !important;
  color: white !important;
  border-bottom: 1px solid #000000 !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
  padding: 0 24px;
}

/* Brand Section */
.brand-section {
  min-width: 280px;
}

.brand-wrapper {
  display: flex;
  align-items: center;
}

.brand-avatar {
  box-shadow: 0 2px 8px rgba(0, 120, 212, 0.3);
}

.brand-title {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.2;
  font-weight: 400;
}

/* Primary Navigation */
.primary-nav-section {
  flex: 1;
  max-width: 600px;
  margin: 0 40px;
}

.primary-tabs {
  height: 100%;
}

.primary-tab {
  font-size: 14px;
  font-weight: 500;
  text-transform: none;
  min-width: auto;
  padding: 0 20px;
  color: rgba(255, 255, 255, 0.8) !important;
  height: 100%;
  border-radius: 0;
}

.primary-tab:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.1);
}

/* Action Section */
.action-section {
  min-width: 480px;
  justify-content: flex-end;
}

.quick-actions {
  display: flex;
  align-items: center;
}

.quick-action-btn {
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: white !important;
  font-size: 13px;
  font-weight: 500;
}

.divider {
  border-color: rgba(255, 255, 255, 0.2) !important;
  height: 24px;
}

.search-field {
  width: 280px;
  margin: 0 16px;
}

.search-field :deep(.v-field__outline) {
  color: rgba(255, 255, 255, 0.3) !important;
}

.search-field :deep(.v-field__input) {
  color: white !important;
  font-size: 14px;
}

.search-field :deep(.v-field__prepend-inner) {
  color: rgba(255, 255, 255, 0.7) !important;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn {
  color: rgba(255, 255, 255, 0.8) !important;
}

.action-btn:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

.user-profile-btn {
  color: white !important;
  text-transform: none;
  padding: 4px 8px;
  border-radius: 4px;
}

.user-profile-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.user-info {
  text-align: left;
  line-height: 1.2;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.user-role {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.profile-menu {
  border: 1px solid #edebe9;
  border-radius: 4px;
  background: white !important;
}

/* Secondary Navigation Bar */
.secondary-nav-bar {
  background: #212121;
  border-bottom: 0px solid #484644;
  padding: 0px 0px;
}

.secondary-nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
}

.filters-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.filters-label {
  font-size: 13px;
  font-weight: 600;
  color: white;
}

.view-toggle {
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.view-btn {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9) !important;
}

.time-filter-btn {
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: white !important;
  font-size: 13px;
}

.quick-filters-section {
  display: flex;
  align-items: center;
  gap: 2px;
}

.quick-filter-chip {
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
}

.refresh-btn {
  font-size: 13px;
  font-weight: 500;
  color: white !important;
}

/* Active States */
:deep(.v-tab--selected) {
  color: white !important;
  font-weight: 600;
}

:deep(.v-tab__slider) {
  color: white !important;
}

:deep(.v-btn--selected) {
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

:deep(.v-badge__badge) {
  font-size: 10px;
  font-weight: 600;
}

.menu-btn {
  color: rgba(255, 255, 255, 0.8) !important;
}

.menu-btn:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.v-avatar img) {
  border: 2px solid rgba(255, 255, 255, 0.2);
}

/* Badge styling */
.badge :deep(.v-badge__badge) {
  font-size: 10px;
  font-weight: 600;
  height: 16px;
  min-width: 16px;
  background: #e81123 !important;
}

/* Profile menu text colors */
:deep(.profile-menu .v-list-item-title) {
  color: #323130 !important;
}

:deep(.profile-menu .v-icon) {
  color: #605e5c !important;
}

.brand-logo {
  height: 55px;          
  width: auto;           
  object-fit: contain;   
  display: block;
  margin-left: -10px; 
}    

.v-avatar img {
  width: 100%;          
  height: 100%;        
  object-fit: cover;    
  border-radius: 50%;   
  display: block;     
}
</style>