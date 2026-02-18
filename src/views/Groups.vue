<template>
  <v-container fluid class="qualys-page-container pa-6">
    <!-- PAGE HEADER -->
    <v-row class="mb-6" align="center" justify="space-between">
      <v-col cols="12" md="auto">
        <div class="d-flex align-center flex-wrap gap-4">
          <h1 class="text-h4 page-title font-weight-bold">Threat Intelligence Dashboard</h1>
          <v-chip color="warning" variant="outlined" size="small" class="ml-2">
            Last Updated: 2 min ago
          </v-chip>
        </div>
      </v-col>
      
      <v-col cols="12" md="auto">
        <div class="d-flex gap-2">
          <v-btn variant="outlined" color="primary" prepend-icon="mdi-refresh">
            Refresh Data
          </v-btn>
          <v-btn color="primary" prepend-icon="mdi-download" class="ml-2">
            Export Report
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- QUICK METRICS ROW -->
    <v-row class="mb-6">
      <!-- ACTIVE THREATS -->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="metric-card threat-card" elevation="1" :class="{ 'on-hover': hover }" @mouseenter="hover = true" @mouseleave="hover = false">
          <v-card-text>
            <div class="d-flex align-center gap-3 mb-4">
              <v-icon color="error" size="32">mdi-alert-circle</v-icon>
              <div>
                <div class="text-body-2 text-grey-darken-1">Active Threats</div>
                <div class="text-h4 font-weight-bold">142</div>
              </div>
            </div>
            
            <div class="d-flex align-center text-success mb-3">
              <v-icon size="small" color="success">mdi-trending-up</v-icon>
              <span class="text-caption ml-1">+12% from yesterday</span>
            </div>

            <div class="metric-breakdown">
              <div class="d-flex align-center ga-2 mb-2">
                <span class="dot critical"></span>
                <span class="text-caption">Critical: 24</span>
              </div>
              <div class="d-flex align-center ga-2 mb-2">
                <span class="dot high"></span>
                <span class="text-caption">High: 56</span>
              </div>
              <div class="d-flex align-center ga-2">
                <span class="dot medium"></span>
                <span class="text-caption">Medium: 62</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- THREAT DETECTION RATE -->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="metric-card detection-card" elevation="1">
          <v-card-text>
            <div class="d-flex align-center gap-3 mb-4">
              <v-icon color="warning" size="32">mdi-radar</v-icon>
              <div>
                <div class="text-body-2 text-grey-darken-1">Detection Rate</div>
                <div class="text-h4 font-weight-bold">98.7%</div>
              </div>
            </div>

            <div class="gauge-container mb-3">
              <v-progress-linear
                :model-value="98.7"
                color="warning"
                height="8"
                rounded
                bg-color="grey-lighten-2"
              ></v-progress-linear>
              <div class="text-caption text-right text-grey-darken-1 mt-1">Accuracy</div>
            </div>

            <div class="d-flex align-center text-success mb-3">
              <v-icon size="small" color="success">mdi-trending-up</v-icon>
              <span class="text-caption ml-1">+12% from yesterday</span>
            </div>

            <div class="metric-breakdown">
              <div class="d-flex align-center ga-2 mb-2">
                <span class="dot critical"></span>
                <span class="text-caption">Critical: 24</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- MEAN TIME TO RESPOND -->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="metric-card response-card" elevation="1">
          <v-card-text>
            <div class="d-flex align-center gap-3 mb-4">
              <v-icon color="info" size="32">mdi-timer</v-icon>
              <div>
                <div class="text-body-2 text-grey-darken-1">Mean Time to Respond</div>
                <div class="text-h4 font-weight-bold">4.2 min</div>
              </div>
            </div>

            <div class="d-flex align-center text-error mb-3">
              <v-icon size="small" color="error">mdi-trending-down</v-icon>
              <span class="text-caption ml-1">-18% improvement</span>
            </div>

            <div class="time-distribution">
              <div class="d-flex justify-space-between align-center py-2" style="border-bottom: 1px solid #f0f0f0;">
                <span class="text-caption text-grey-darken-1">Detection</span>
                <span class="text-caption font-weight-bold">0.8 min</span>
              </div>
              <div class="d-flex justify-space-between align-center py-2" style="border-bottom: 1px solid #f0f0f0;">
                <span class="text-caption text-grey-darken-1">Analysis</span>
                <span class="text-caption font-weight-bold">1.5 min</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- THREAT INTELLIGENCE FEEDS -->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="metric-card feeds-card" elevation="1">
          <v-card-text>
            <div class="d-flex align-center gap-3 mb-4">
              <v-icon color="success" size="32">mdi-rss</v-icon>
              <div>
                <div class="text-body-2 text-grey-darken-1">Active Feeds</div>
                <div class="text-h4 font-weight-bold">8/10</div>
              </div>
            </div>

            <div class="feeds-status">
              <div class="d-flex align-center text-success py-2">
                <v-icon size="small" color="success" class="mr-2">mdi-check-circle</v-icon>
                <span class="text-caption">Qualys Threat DB</span>
              </div>
              <div class="d-flex align-center text-success py-2">
                <v-icon size="small" color="success" class="mr-2">mdi-check-circle</v-icon>
                <span class="text-caption">MITRE ATT&CK</span>
              </div>
              <div class="d-flex align-center text-warning py-2">
                <v-icon size="small" color="warning" class="mr-2">mdi-alert</v-icon>
                <span class="text-caption">VirusTotal</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- MAIN DASHBOARD AREA -->
    <v-row class="mb-6">
      <!-- THREAT MAP -->
      <v-col cols="12" lg="6">
        <v-card class="dashboard-card" elevation="2">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6 font-weight-bold">Global Threat Activity</span>
            <div class="d-flex align-center">
              <span class="text-caption text-grey-darken-1 mr-1">Last 24 hours</span>
              <v-icon size="small">mdi-chevron-down</v-icon>
            </div>
          </v-card-title>

          <v-card-text>
            <div class="threat-map-placeholder">
              <div class="map-container">
                <div class="map-point" style="top: 30%; left: 20%;">
                  <div class="point-label">US</div>
                  <div class="point-value">42</div>
                </div>
                <div class="map-point critical" style="top: 40%; left: 50%;">
                  <div class="point-label">EU</div>
                  <div class="point-value">68</div>
                </div>
                <div class="map-point high" style="top: 60%; left: 70%;">
                  <div class="point-label">APAC</div>
                  <div class="point-value">24</div>
                </div>
                <div class="map-point" style="top: 50%; left: 40%;">
                  <div class="point-label">ME</div>
                  <div class="point-value">18</div>
                </div>
              </div>
              
              <div class="map-legend mt-4">
                <div class="d-flex flex-wrap gap-4">
                  <div class="d-flex align-center">
                    <span class="legend-dot critical"></span>
                    <span class="text-caption ml-2">Critical (50+)</span>
                  </div>
                  <div class="d-flex align-center">
                    <span class="legend-dot high"></span>
                    <span class="text-caption ml-2">High (25-49)</span>
                  </div>
                  <div class="d-flex align-center">
                    <span class="legend-dot medium"></span>
                    <span class="text-caption ml-2">Medium (10-24)</span>
                  </div>
                  <div class="d-flex align-center">
                    <span class="legend-dot low"></span>
                    <span class="text-caption ml-2">Low (&lt;10)</span>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- THREAT TIMELINE -->
      <v-col cols="12" lg="6">
        <v-card class="dashboard-card" elevation="2">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6 font-weight-bold">Threat Timeline</span>
            <div>
              <v-btn icon="mdi-filter" size="small" variant="text"></v-btn>
              <v-btn icon="mdi-dots-vertical" size="small" variant="text"></v-btn>
            </div>
          </v-card-title>

          <v-card-text>
            <div class="timeline-container">
              <div class="timeline-event critical">
                <div class="event-time">14:30</div>
                <div class="event-content">
                  <div class="event-title">Ransomware Campaign Detected</div>
                  <div class="event-desc">LockBit variant targeting finance sector</div>
                </div>
              </div>
              <div class="timeline-event high">
                <div class="event-time">13:15</div>
                <div class="event-content">
                  <div class="event-title">DDoS Attack Mitigated</div>
                  <div class="event-desc">500 Gbps attack on web services</div>
                </div>
              </div>
              <div class="timeline-event medium">
                <div class="event-time">11:45</div>
                <div class="event-content">
                  <div class="event-title">Phishing Campaign</div>
                  <div class="event-desc">Targeted executive emails</div>
                </div>
              </div>
              <div class="timeline-event">
                <div class="event-time">10:20</div>
                <div class="event-content">
                  <div class="event-title">Vulnerability Scan Complete</div>
                  <div class="event-desc">24 new CVEs identified</div>
                </div>
              </div>
              <div class="timeline-event critical">
                <div class="event-time">09:05</div>
                <div class="event-content">
                  <div class="event-title">Zero-day Exploit Detected</div>
                  <div class="event-desc">CVE-2024-12345 in network stack</div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- TOP THREAT ACTORS -->
      <v-col cols="12" lg="6" class="mt-4">
        <v-card class="dashboard-card" elevation="2">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6 font-weight-bold">Top Threat Actors</span>
            <v-chip color="error" size="small">APT Groups</v-chip>
          </v-card-title>

          <v-card-text>
            <div class="actors-list">
              <div class="actor-item">
                <div class="actor-rank">1</div>
                <v-avatar color="error" size="40" class="actor-avatar">
                  <span class="text-h6">L</span>
                </v-avatar>
                <div class="actor-info flex-grow-1">
                  <div class="actor-name font-weight-bold">Lazarus Group</div>
                  <div class="actor-activity text-caption text-grey">15 incidents | Last: 2h ago</div>
                </div>
                <v-chip color="error" variant="outlined" size="x-small">Critical</v-chip>
              </div>

              <div class="actor-item">
                <div class="actor-rank">2</div>
                <v-avatar color="warning" size="40" class="actor-avatar">
                  <span class="text-h6">A</span>
                </v-avatar>
                <div class="actor-info flex-grow-1">
                  <div class="actor-name font-weight-bold">APT29</div>
                  <div class="actor-activity text-caption text-grey">12 incidents | Last: 4h ago</div>
                </div>
                <v-chip color="warning" variant="outlined" size="x-small">High</v-chip>
              </div>

              <div class="actor-item">
                <div class="actor-rank">3</div>
                <v-avatar color="info" size="40" class="actor-avatar">
                  <span class="text-h6">F</span>
                </v-avatar>
                <div class="actor-info flex-grow-1">
                  <div class="actor-name font-weight-bold">FIN7</div>
                  <div class="actor-activity text-caption text-grey">8 incidents | Last: 6h ago</div>
                </div>
                <v-chip color="info" variant="outlined" size="x-small">Medium</v-chip>
              </div>

              <div class="actor-item">
                <div class="actor-rank">4</div>
                <v-avatar color="grey" size="40" class="actor-avatar">
                  <span class="text-h6">C</span>
                </v-avatar>
                <div class="actor-info flex-grow-1">
                  <div class="actor-name font-weight-bold">Cozy Bear</div>
                  <div class="actor-activity text-caption text-grey">6 incidents | Last: 8h ago</div>
                </div>
                <v-chip variant="outlined" size="x-small">Low</v-chip>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- THREAT CATEGORIES -->
      <v-col cols="12" lg="6" class="mt-4">
        <v-card class="dashboard-card" elevation="2">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6 font-weight-bold">Threat Categories</span>
            <v-btn icon="mdi-chart-pie" size="small" variant="text"></v-btn>
          </v-card-title>

          <v-card-text>
            <div class="categories-chart">
              <div class="chart-container mb-4">
                <div class="chart-segment malware" style="flex: 0.35">
                  <div class="segment-label">Malware</div>
                  <div class="segment-value">35%</div>
                </div>
                <div class="chart-segment phishing" style="flex: 0.25">
                  <div class="segment-label">Phishing</div>
                  <div class="segment-value">25%</div>
                </div>
                <div class="chart-segment ddos" style="flex: 0.20">
                  <div class="segment-label">DDoS</div>
                  <div class="segment-value">20%</div>
                </div>
                <div class="chart-segment exploit" style="flex: 0.15">
                  <div class="segment-label">Exploits</div>
                  <div class="segment-value">15%</div>
                </div>
                <div class="chart-segment insider" style="flex: 0.05">
                  <div class="segment-label">Insider</div>
                  <div class="segment-value">5%</div>
                </div>
              </div>
              
              <div class="chart-legend pa-3 bg-grey-lighten-4 rounded">
                <div class="d-flex flex-wrap gap-4">
                  <div class="d-flex align-center">
                    <span class="legend-color malware"></span>
                    <span class="text-caption ml-2">Malware: 142 incidents</span>
                  </div>
                  <div class="d-flex align-center">
                    <span class="legend-color phishing"></span>
                    <span class="text-caption ml-2">Phishing: 101 incidents</span>
                  </div>
                  <div class="d-flex align-center">
                    <span class="legend-color ddos"></span>
                    <span class="text-caption ml-2">DDoS: 81 incidents</span>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- THREAT INTELLIGENCE TABLE -->
    <v-row>
      <v-col cols="12">
        <v-card class="dashboard-card" elevation="2">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6 font-weight-bold">Recent Threat Intelligence</span>
            <div class="d-flex gap-2">
              <v-text-field
                v-model="search"
                label="Search threats..."
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-magnify"
                hide-details
                class="search-field"
              ></v-text-field>
              <v-btn variant="outlined" color="primary" size="small" prepend-icon="mdi-filter">
                Filter
              </v-btn>
            </div>
          </v-card-title>

          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="threatItems"
              :search="search"
              hover
              class="threat-table"
            >
              <!-- Using # syntax for Vue 3 slots -->
              <template #item="{ item }">
                <div class="d-flex align-center">
                  <v-icon color="error" size="small" class="mr-2">mdi-alert-circle</v-icon>
                  <span>{{ item.name }}</span>
                </div>
              </template>

              <template #ite="{ item }">
                <v-chip :color="item.severityColor" size="x-small">
                  {{ item.severity }}
                </v-chip>
              </template>

              <template #it="{ item }">
                <div class="d-flex align-center">
                  <v-icon size="small" class="mr-1">mdi-dns</v-icon>
                  <span>{{ item.assetCount }}</span>
                </div>
              </template>

              <template #i="{ item }">
                <v-chip :color="item.statusColor" size="x-small" variant="flat">
                  {{ item.status }}
                </v-chip>
              </template>

              <template #items>
                <div>
                  <v-btn icon="mdi-eye" size="x-small" variant="text"></v-btn>
                  <v-btn icon="mdi-shield" size="x-small" variant="text" class="ml-1"></v-btn>
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ThreatIntelligenceDashboard',
  
  data() {
    return {
      hover: false,
      search: '',
      headers: [
        { title: 'Threat Name', key: 'name' },
        { title: 'Severity', key: 'severity' },
        { title: 'Category', key: 'category' },
        { title: 'First Seen', key: 'firstSeen' },
        { title: 'Affected Assets', key: 'assetCount' },
        { title: 'Status', key: 'status' },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
      threatItems: [
        {
          name: 'LockBit 3.0 Campaign',
          severity: 'Critical',
          severityColor: 'error',
          category: 'Ransomware',
          firstSeen: '2h ago',
          assetCount: 42,
          status: 'Active',
          statusColor: 'error'
        },
        {
          name: 'SolarWinds Exploit',
          severity: 'High',
          severityColor: 'warning',
          category: 'Supply Chain',
          firstSeen: '4h ago',
          assetCount: 18,
          status: 'Contained',
          statusColor: 'success'
        },
        {
          name: 'Phishing: CEO Fraud',
          severity: 'Medium',
          severityColor: 'info',
          category: 'Phishing',
          firstSeen: '6h ago',
          assetCount: 8,
          status: 'Investigating',
          statusColor: 'warning'
        },
        {
          name: 'Mirai Botnet DDoS',
          severity: 'High',
          severityColor: 'warning',
          category: 'DDoS',
          firstSeen: '8h ago',
          assetCount: 56,
          status: 'Mitigated',
          statusColor: 'success'
        },
        {
          name: 'Log4Shell Exploit',
          severity: 'Critical',
          severityColor: 'error',
          category: 'Vulnerability',
          firstSeen: '12h ago',
          assetCount: 124,
          status: 'Active',
          statusColor: 'error'
        },
        {
          name: 'Credential Stuffing',
          severity: 'Medium',
          severityColor: 'info',
          category: 'Credential Theft',
          firstSeen: '1d ago',
          assetCount: 23,
          status: 'Contained',
          statusColor: 'success'
        },
        {
          name: 'Emotet Malware',
          severity: 'High',
          severityColor: 'warning',
          category: 'Malware',
          firstSeen: '2d ago',
          assetCount: 67,
          status: 'Remediated',
          statusColor: 'success'
        }
      ]
    }
  }
}
</script>

<style scoped>
.qualys-page-container {
  background: #f8f9fa;
  min-height: 100vh;
}

.page-title {
  color: #075097;
  margin: 0;
}

.metric-card {
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1) !important;
}

.threat-card {
  border-left: 4px solid #dc3545 !important;
}

.detection-card {
  border-left: 4px solid #ffc107 !important;
}

.response-card {
  border-left: 4px solid #17a2b8 !important;
}

.feeds-card {
  border-left: 4px solid #28a745 !important;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.critical {
  background: #dc3545;
}

.dot.high {
  background: #ffc107;
}

.dot.medium {
  background: #17a2b8;
}

.gauge-container {
  width: 100%;
}

/* Threat Map */
.threat-map-placeholder {
  width: 100%;
}

.map-container {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  border-radius: 6px;
  margin-bottom: 20px;
}

.map-point {
  position: absolute;
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease;
}

.map-point:hover {
  transform: translate(-50%, -50%) scale(1.1);
  z-index: 10;
}

.map-point.critical {
  background: #ffebee;
  border: 2px solid #dc3545;
}

.map-point.high {
  background: #fff8e1;
  border: 2px solid #ffc107;
}

.point-label {
  font-size: 10px;
  font-weight: 600;
  color: #666;
}

.point-value {
  font-size: 14px;
  font-weight: 700;
  color: #212121;
}

.map-legend {
  padding: 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.legend-dot.critical {
  background: #dc3545;
}

.legend-dot.high {
  background: #ffc107;
}

.legend-dot.medium {
  background: #17a2b8;
}

.legend-dot.low {
  background: #6c757d;
}

/* Timeline */
.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.timeline-event {
  display: flex;
  gap: 16px;
  padding: 12px;
  background: white;
  border-radius: 6px;
  border-left: 4px solid #6c757d;
  transition: transform 0.2s ease;
}

.timeline-event:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.timeline-event.critical {
  border-left-color: #dc3545;
  background: #ffebee;
}

.timeline-event.high {
  border-left-color: #ffc107;
  background: #fff8e1;
}

.timeline-event.medium {
  border-left-color: #17a2b8;
  background: #e3f2fd;
}

.event-time {
  min-width: 60px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  padding-top: 2px;
}

.event-content {
  flex: 1;
}

.event-title {
  font-size: 14px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 4px;
}

.event-desc {
  font-size: 12px;
  color: #666;
}

/* Actors List */
.actors-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.actor-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;
}

.actor-item:hover {
  border-color: #075097;
  box-shadow: 0 4px 12px rgba(7, 80, 151, 0.1);
}

.actor-rank {
  width: 24px;
  height: 24px;
  background: #075097;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

/* Categories Chart */
.chart-container {
  display: flex;
  height: 120px;
  border-radius: 6px;
  overflow: hidden;
}

.chart-segment {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  position: relative;
  transition: transform 0.2s ease;
}

.chart-segment:hover {
  transform: scale(1.05);
  z-index: 1;
}

.chart-segment.malware {
  background: linear-gradient(135deg, #dc3545, #ff6b6b);
}

.chart-segment.phishing {
  background: linear-gradient(135deg, #ffc107, #ffd54f);
}

.chart-segment.ddos {
  background: linear-gradient(135deg, #17a2b8, #4dabf7);
}

.chart-segment.exploit {
  background: linear-gradient(135deg, #28a745, #51cf66);
}

.chart-segment.insider {
  background: linear-gradient(135deg, #6c757d, #adb5bd);
}

.segment-label {
  font-size: 12px;
  margin-bottom: 4px;
}

.segment-value {
  font-size: 18px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  display: inline-block;
}

.legend-color.malware {
  background: #dc3545;
}

.legend-color.phishing {
  background: #ffc107;
}

.legend-color.ddos {
  background: #17a2b8;
}

/* Table */
.search-field {
  min-width: 200px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.metric-card, .dashboard-card {
  animation: fadeIn 0.5s ease-out;
}

/* Utilities */
.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

.gap-4 {
  gap: 16px;
}

/* Responsive */
@media (max-width: 600px) {
  .qualys-page-container {
    padding: 16px;
  }
  
  .search-field {
    width: 100%;
  }
}
</style>