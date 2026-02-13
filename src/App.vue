<template>
  <v-app>
    <MainLayout>
      <router-view v-slot="{ Component }">
        <component :is="Component || ComingSoon" />
      </router-view>
    </MainLayout>
  </v-app>
</template>

<script setup>
import MainLayout from './layouts/MainLayout.vue'
import ComingSoon from './views/ComingSoon.vue'
</script>
