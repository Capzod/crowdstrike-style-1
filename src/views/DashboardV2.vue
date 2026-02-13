<template>
  <div class="dashboard">

    <!-- HEADER PANEL -->
    <v-card class="header-panel pa-6" elevation="1">
      <h2 class="main-title">Welcome back!</h2>

      <v-row dense class="mt-4">
        <v-col cols="12" md="3" v-for="s in stats" :key="s.label">
          <div class="stat-box">
            <v-icon size="28" :color="s.color">{{ s.icon }}</v-icon>
            <div class="flat-value">{{ f.value }}</div>
            <div class="flat-label">{{ f.label }}</div>
          </div>
        </v-col>
      </v-row>
    </v-card>


    <!-- SPLIT SECTION -->
    <v-row dense class="mt-8">

      <!-- LEFT SIDE: RECENT ACTIVITY -->
      <v-col cols="12" md="7">
        <v-card elevation="1" class="pa-5">
          <h3 class="section-title">Recent Activity</h3>

          <v-list density="compact">
            <v-list-item v-for="a in recent" :key="a.text">
              <v-list-item-avatar>
                <v-icon color="#0078D4">{{ a.icon }}</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ a.text }}</v-list-item-title>
                <v-list-item-subtitle>{{ a.time }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- RIGHT SIDE: QUICK TOOLS PANEL -->
      <v-col cols="12" md="5">
        <v-card elevation="1" class="pa-5">
          <h3 class="section-title">Quick Tools</h3>

          <v-row dense class="mt-2">
            <v-col cols="6" v-for="t in tools" :key="t.label">
              <v-card class="tool-card pa-4" elevation="0">
                <v-icon size="28" color="#0078D4">{{ t.icon }}</v-icon>
                <div class="tool-label">{{ t.label }}</div>
              </v-card>
            </v-col>
          </v-row>

        </v-card>
      </v-col>

    </v-row>


    <!-- SYSTEM STATUS -->
    <h3 class="section-title mt-10">System Status</h3>

    <v-row dense>
      <v-col cols="12" md="4" v-for="sys in system" :key="sys.title">
        <v-card class="pa-5" elevation="1">
          <h4 class="sys-title">{{ sys.title }}</h4>

          <v-progress-linear
            :model-value="sys.value"
            height="10"
            rounded
            :color="sys.color"
            class="mt-4"
          ></v-progress-linear>

          <p class="sys-caption mt-2">{{ sys.caption }}</p>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script setup>
const stat = [
  { label: "Users", value: "7", icon: "mdi-account-group", color: "#0078D4" },
  { label: "Pages", value: "10", icon: "mdi-file-document-outline", color: "#4CAF50" },
  { label: "Sessions", value: "20", icon: "mdi-timer-sand", color: "#673AB7" },
  { label: "Issues", value: "1", icon: "mdi-alert-circle", color: "#E53935" }
]

const recent = [
  { text: "User1 updated Permissions", time: "5 min ago", icon: "mdi-shield-account" },
  { text: "Admin edited Dashboard", time: "20 min ago", icon: "mdi-pencil" },
  { text: "New page created", time: "1 hr ago", icon: "mdi-file-plus" },
]

const tools = [
  { label: "Create User", icon: "mdi-account-plus" },
  { label: "Create Resource", icon: "mdi-plus-circle-outline" },
  { label: "Upload File", icon: "mdi-upload" },
  { label: "Settings", icon: "mdi-cog" }
]

const system = [
  { title: "CPU Usage", value: 40, color: "#0078D4", caption: "40% used" },
  { title: "Storage", value: 65, color: "#4CAF50", caption: "65% filled" },
  { title: "Network", value: 22, color: "#FF9800", caption: "Normal activity" }
]
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.header-panel {
  border-radius: 16px;
}

.main-title {
  font-size: 24px;
  font-weight: 700;
}

.main-sub {
  opacity: 0.7;
}

.stat-box {
  text-align: center;
  padding: 16px 0;
}

.stat-value {
  font-size: 26px;
  font-weight: 700;
}

.stat-label {
  font-size: 14px;
  opacity: 0.7;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
}

.tool-card {
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.tool-card:hover {
  background: #eef4fb;
}

.tool-label {
  margin-top: 8px;
  font-size: 14px;
}

.sys-title {
  font-size: 16px;
  font-weight: 600;
}

.sys-caption {
  font-size: 14px;
  opacity: 0.7;
}
</style>
