<template>
  <div class="coming-soon-wrapper">
    <v-card class="coming-soon-card elevation-2">
      <v-icon size="60" color="primary" class="mb-4">
        mdi-tools
      </v-icon>

      <h2 class="text-h5 font-weight-medium mb-2">
        Coming Soon
      </h2>

      <p class="text-body-2 text-medium-emphasis">
        This module is under development and will be available in future updates.
      </p>
    </v-card>
  </div>
</template>

<style scoped>
.coming-soon-wrapper {
  height: 80vh;
  width: 200vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.coming-soon-card {
  text-align: center;
  padding: 40px;
  border-radius: 16px;
  background: white;
  max-width: 400px;
}
</style>
