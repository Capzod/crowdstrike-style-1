<template>
  <v-app-bar app flat height="75" class="portal-topbar">
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

      <div class="brand-wrapper" @click="goToHome">
        <img :src="syngentaLogo" alt="Syngenta Logo" class="brand-logo" />
      </div>
    </div>

    <!-- RIGHT: ACTIONS & PROFILE -->
    <div class="d-flex align-center action-section">
      <!-- SEARCH BUTTON -->
      <v-btn 
        icon 
        variant="text" 
        class="search-btn mr-4"
        @click="handleSearch"
      >
        <v-icon color="white" size="24">mdi-magnify</v-icon>
      </v-btn>

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

const handleSearch = () => {
  console.log('Search clicked')
  // Add your search functionality here
}

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.portal-topbar {
  background: #212121 !important;
  color: white !important;
  border-bottom: 1px solid #000000 !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
  padding: 0 12px;
}

/* Brand Section */
.brand-section {
  min-width: 280px;
}

.brand-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer; /* Add pointer cursor to indicate it's clickable */
}

.brand-wrapper:hover {
  opacity: 0.8; /* Optional: Add a slight hover effect */
}

.brand-logo {
  height: 55px;          
  width: auto;           
  object-fit: contain;   
  display: block;
  margin-left: -10px; 
}

/* Action Section */
.action-section {
  flex: 1;
  justify-content: flex-end;
  display: flex;
  align-items: center;
}

.search-btn {
  color: rgba(255, 255, 255, 0.8) !important;
}

.search-btn:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.1) !important;
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

/* Active States */
.menu-btn {
  color: rgba(255, 255, 255, 0.8) !important;
}

.menu-btn:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.v-avatar img) {
  border: 2px solid rgba(255, 255, 255, 0.2);
  width: 100%;          
  height: 100%;        
  object-fit: cover;    
  border-radius: 50%;   
  display: block;
}

/* Profile menu text colors */
:deep(.profile-menu .v-list-item-title) {
  color: #323130 !important;
}

:deep(.profile-menu .v-icon) {
  color: #605e5c !important;
}

:deep(.v-badge__badge) {
  font-size: 10px;
  font-weight: 600;
}
</style>