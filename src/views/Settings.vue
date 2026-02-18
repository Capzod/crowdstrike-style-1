<template>
  <div class="settings-page">

    <div class="header">
      <v-icon size="40" color="#0078D4">mdi-cog-outline</v-icon>
      <div class="ml-3">
        <h2 class="title">Settings</h2>
        <p class="sub">Manage system preferences</p>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Settings',
}
</script>

<style scoped>
.settings-page {
  padding: 20px;
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 650px;
}
.title {
  margin: 0;
  font-size: 24px;
  padding-top: -150px;
}
</style>