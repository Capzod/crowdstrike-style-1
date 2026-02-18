<template>
  <v-app class="security-dashboard">
    <v-main>
      <v-container fluid class="pa-3">
        <!-- Two-column layout -->
        <div class="layout-wrapper" :class="{ 'nav-collapsed': !isLeftNavExpanded }">
          
          <!-- LEFT SIDEBAR -->
          <div class="left-sidebar">
            <!-- Expanded Sidebar -->
<template v-if="isLeftNavExpanded">
  <v-card class="hero-card mb-3">
    <div class="hero-content">
      <div class="hero-number">56.2K</div>
      <div class="hero-label">Total Control Instances</div>
    </div>
    <v-btn
      icon
      size="x-small"
      color="inherit"
      class="hero-toggle-overflow"
      @click="toggleLeftNav"
      title="Collapse Filters"
    >
      <v-icon size="medium">mdi-chevron-left</v-icon>
    </v-btn>
  </v-card>
              <v-card class="filters-panel pa-3">
                <!-- QUICK FILTERS -->
                <div class="nav-section">
                  <div class="nav-title">QUICK FILTERS</div>

                  <!-- Posture Filter -->
                  <div class="filter-group">
                    <div class="filter-label">Posture Status</div>
                    <div class="chip-group">
                      <v-chip
                        :color="selectedPosture === '' ? 'primary' : 'default'"
                        variant="flat"
                        size="x-small"
                        @click="setPostureFilter('')"
                      >All</v-chip>
                      <v-chip
                        :color="selectedPosture === 'Fail' ? 'error' : 'default'"
                        variant="flat"
                        size="x-small"
                        @click="setPostureFilter('Fail')"
                      >Fail</v-chip>
                      <v-chip
                        :color="selectedPosture === 'Pass' ? 'success' : 'default'"
                        variant="flat"
                        size="x-small"
                        @click="setPostureFilter('Pass')"
                      >Pass</v-chip>
                    </div>
                  </div>

                  <!-- Criticality Filter -->
                  <div class="filter-group">
                    <div class="filter-label">Criticality</div>
                    <v-select
                      v-model="selectedCriticality"
                      :items="criticalityOptions"
                      density="compact"
                      variant="outlined"
                      hide-details
                      class="compact-select"
                    ></v-select>
                  </div>

                  <!-- Search -->
                  <div class="filter-group">
                    <div class="filter-label">Search</div>
                    <v-text-field
                      v-model="searchText"
                      placeholder="CID, asset..."
                      density="compact"
                      variant="outlined"
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      class="compact-text-field"
                    ></v-text-field>
                  </div>
                </div>

                <!-- REMEDIATION STATS -->
                <div class="nav-section">
                  <div class="nav-title">REMEDIATION</div>
                  <div class="stats-container">
                    <div class="stat-item">
                      <span class="dot remediable"></span>
                      <span class="stat-label">Remediable</span>
                      <span class="stat-value">34.5K</span>
                    </div>
                    <div class="stat-item">
                      <span class="dot non-remediable"></span>
                      <span class="stat-label">Not Remediable</span>
                      <span class="stat-value">21.7K</span>
                    </div>
                  </div>
                </div>

                <!-- STATUS -->
                <div class="nav-section">
                  <div class="nav-title">STATUS</div>
                  <div class="chip-group">
                    <v-chip color="success" size="x-small">Operational</v-chip>
                    <v-chip color="warning" size="x-small">At Risk</v-chip>
                  </div>
                </div>

                <!-- TAGS -->
                <div class="nav-section">
                  <div class="nav-title">TAGS</div>
                  <div class="chip-group">
                    <v-chip size="x-small">Production</v-chip>
                    <v-chip size="x-small">PCI</v-chip>
                    <v-chip size="x-small">Internal</v-chip>
                  </div>
                </div>

                <!-- ACTIONS -->
                <div class="nav-section">
                  <div class="nav-title">ACTIONS</div>
                  <div class="action-buttons">
                    <v-btn
                      color="primary"
                      block
                      size="x-small"
                      prepend-icon="mdi-play"
                      class="mb-1"
                    >Run Assessment</v-btn>
                    <v-btn
                      color="primary"
                      variant="outlined"
                      block
                      size="x-small"
                      prepend-icon="mdi-clock-outline"
                    >Schedule Scan</v-btn>
                  </div>
                </div>
              </v-card>
            </template>

            <!-- Collapsed Sidebar -->
<template v-else>
  <div class="collapsed-sidebar">
    <!-- Hover trigger area -->
    <div class="hover-trigger" @click="toggleLeftNav">
      <v-icon size="large" color="grey-darken-1" class="chevron-icon">
        mdi-chevron-double-right
      </v-icon>
    </div>
    <!-- Vertical highlight bar that appears on hover -->
    <div class="highlight-bar"></div>
  </div>
</template>
          </div>

          <!-- RIGHT MAIN CONTENT -->
          <div class="main-content" :class="{ 'full-width': !isLeftNavExpanded }">
            
            <!-- Search Bar -->
            <v-card class="search-bar mb-3 pa-2">
              <div class="d-flex align-center">
                <!-- Scope Selector -->
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <div v-bind="props" class="scope-selector">
                      <span class="text-body-2">{{ selectedScope }}</span>
                      <v-icon size="small">mdi-chevron-down</v-icon>
                    </div>
                  </template>
                  <v-list density="compact">
                    <v-list-item
                      v-for="scope in scopes"
                      :key="scope"
                      @click="selectedScope = scope"
                    >
                      <v-list-item-title>{{ scope }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <div class="search-divider"></div>

                <!-- Search Input -->
                <v-text-field
                  v-model="searchText"
                  :placeholder="getPlaceholder()"
                  density="compact"
                  variant="plain"
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  class="flex-grow-1"
                ></v-text-field>
              </div>
            </v-card>

            <!-- Metrics Row -->
            <v-row class="mb-3" dense>
              <!-- Audit Readiness Card -->
              <v-col cols="12" md="6">
                <v-card class="metric-card pa-3">
                  <div class="metric-title">Overall Audit Readiness</div>
                  
                  <div class="audit-score-block">
                    <div class="audit-label">Audit Score</div>
                    <div class="audit-score-value">32%</div>
                  </div>

                  <div class="audit-progress-section">
                    <v-progress-linear
                      v-model="auditProgress"
                      height="12"
                      color="success"
                      bg-color="error"
                      class="mb-1"
                    ></v-progress-linear>

                    <div class="audit-stats">
                      <span class="text-caption">Total Passed <strong>30.1K</strong></span>
                      <span class="text-caption">Total Failed <strong>56.2K</strong></span>
                    </div>
                  </div>
                </v-card>
              </v-col>

              <!-- Failure by Criticality Card -->
              <v-col cols="12" md="6">
                <v-card class="metric-card pa-3">
                  <div class="metric-title">Failure By Criticality</div>
                  
                  <div class="bar-chart-container">
                    <div class="y-axis">
                      <span class="text-caption">300K</span>
                      <span class="text-caption">200K</span>
                      <span class="text-caption">100K</span>
                      <span class="text-caption">0</span>
                    </div>

                    <div class="bars">
                      <div v-for="item in criticalityData" :key="item.label" class="bar-group">
                        <div 
                          class="bar" 
                          :class="item.color"
                          :style="{ height: item.height + 'px' }"
                        ></div>
                        <span class="text-caption">{{ item.label }}</span>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <!-- Data Table -->
            <v-card class="table-card">
              <div class="table-header">
                <h6 class="text-subtitle-1 font-weight-bold">Control Compliance</h6>
                
                <div class="table-controls">
                  <v-text-field
                    v-model="tableSearch"
                    placeholder="Search CID, Asset, Policy..."
                    density="compact"
                    variant="outlined"
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    class="table-search"
                  ></v-text-field>

                  <v-btn
                    color="primary"
                    variant="outlined"
                    size="x-small"
                    prepend-icon="mdi-download"
                  >Export</v-btn>
                </div>
              </div>

              <v-data-table
                :headers="tableHeaders"
                :items="filteredItems"
                :items-per-page="pageSize"
                v-model:page="currentPage"
                class="elevation-0"
                density="compact"
                hover
              >
                <!-- Status Column -->
<template #item.status="{ item }">
  <v-chip
    :color="getStatusColor(item.status)"
    size="x-small"
    class="status-chip"
  >
    {{ item.status.toUpperCase() }}
  </v-chip>
</template>

<!-- CID Column -->
<template #item.cid="{ item }">
  <a href="#" class="text-primary text-caption" @click.prevent="openDetails(item.cid)">
    {{ item.cid }}
  </a>
</template>

<!-- Control Statement Column -->
<template #item.statement="{ item }">
  <span class="text-caption">{{ truncateText(item.statement, 40) }}</span>
</template>

<!-- QDS Column -->
<template #item.qds="{ item }">
  <div class="qds-badge" :class="getQdsClass(item.qds)">
    {{ item.qds }}
  </div>
</template>

<!-- Technology Column -->
<template #item.technology="{ item }">
  <span class="text-caption">{{ item.technology }}</span>
</template>

<!-- Assets Column -->
<template #item.asset="{ item }">
  <a href="#" class="text-primary text-caption">{{ item.asset }}</a>
</template>

<!-- Policy Column -->
<template #item.policy="{ item }">
  <span class="text-caption">{{ truncateText(item.policy, 25) }}</span>
</template>

<!-- Actions Column -->
<template #item.actions>
  <v-btn icon size="x-small" color="primary" title="View Details">
    <v-icon size="small">mdi-eye</v-icon>
  </v-btn>
  <v-btn icon size="x-small" color="secondary" title="Edit" class="ml-1">
    <v-icon size="small">mdi-pencil</v-icon>
  </v-btn>
</template>
              </v-data-table>

              <!-- Pagination -->
              <div class="table-footer">
                <div class="footer-left">
                  <v-select
                    v-model="pageSize"
                    :items="[10, 25, 50]"
                    density="compact"
                    variant="outlined"
                    hide-details
                    class="page-size-select"
                  ></v-select>
                  <div class="page-info text-caption">
                    Showing {{ (currentPage - 1) * pageSize + 1 }}-{{ 
                      Math.min(currentPage * pageSize, filteredItems.length) 
                    }} of {{ filteredItems.length }}
                  </div>
                </div>

                <div class="footer-right">
                  <v-pagination
                    v-model="currentPage"
                    :length="totalPages"
                    :total-visible="5"
                    size="x-small"
                  ></v-pagination>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// State
const isLeftNavExpanded = ref(true)
const selectedPosture = ref('')
const selectedCriticality = ref(null)
const searchText = ref('')
const tableSearch = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const selectedScope = ref('Controls')

const scopes = ['Controls', 'Assets', 'Vulnerabilities']

const criticalityOptions = [
  { title: 'All', value: null },
  { title: 'Critical', value: 'Critical' },
  { title: 'Serious', value: 'Serious' },
  { title: 'Medium', value: 'Medium' }
]

const criticalityData = [
  { label: 'Serious', height: 120, color: 'serious' },
  { label: 'Critical', height: 180, color: 'critical' },
  { label: 'Medium', height: 40, color: 'medium' },
  { label: 'Urgent', height: 60, color: 'urgent' },
  { label: 'Minimal', height: 25, color: 'minimal' },
  { label: 'Unidentified', height: 20, color: 'unknown' }
]

const auditProgress = ref(32)

// Table data
const allItems = ref([])

const tableHeaders = [
  { title: 'STATUS', key: 'status', align: 'start' },
  { title: 'CID', key: 'cid', align: 'start' },
  { title: 'CONTROL STATEMENT', key: 'statement', align: 'start' },
  { title: 'QDS', key: 'qds', align: 'center' },
  { title: 'TECHNOLOGY', key: 'technology', align: 'start' },
  { title: 'ASSETS', key: 'asset', align: 'start' },
  { title: 'POLICY', key: 'policy', align: 'start' },
  { title: 'ACTIONS', key: 'actions', align: 'center', sortable: false }
]

// Computed
const filteredItems = computed(() => {
  let items = [...allItems.value]

  if (selectedPosture.value) {
    items = items.filter(item => item.status === selectedPosture.value)
  }

  if (tableSearch.value) {
    const search = tableSearch.value.toLowerCase()
    items = items.filter(item => 
      item.cid.toLowerCase().includes(search) ||
      item.statement.toLowerCase().includes(search) ||
      item.asset.toLowerCase().includes(search)
    )
  }

  return items
})

const totalPages = computed(() => 
  Math.max(1, Math.ceil(filteredItems.value.length / pageSize.value))
)

// Methods
const toggleLeftNav = () => {
  isLeftNavExpanded.value = !isLeftNavExpanded.value
}

const setPostureFilter = (posture) => {
  selectedPosture.value = selectedPosture.value === posture ? '' : posture
  currentPage.value = 1
}

const getPlaceholder = () => {
  const placeholders = {
    'Controls': 'Search by control ID, name, or keyword',
    'Assets': 'Search by asset name, IP, or tag',
    'Vulnerabilities': 'Search by QID, CVE, or title'
  }
  return placeholders[selectedScope.value] || 'Search...'
}

const getStatusColor = (status) => {
  return status?.toLowerCase() === 'fail' ? 'error' : 'success'
}

const getQdsClass = (qds) => {
  if (qds >= 90) return 'high'
  if (qds >= 80) return 'medium'
  return 'low'
}

const openDetails = (cid) => {
  console.log('Navigate to:', cid)
  // router.push(`/controls/${cid}`)
}

const truncateText = (text, length) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

// Initialize mock data
onMounted(() => {
  for (let i = 0; i < 250; i++) {
    const sev = i % 5 === 3 ? 'Pass' : 'Fail'
    
    allItems.value.push({
      id: i,
      status: sev,
      cid: (1900 + i).toString(),
      statement: i % 3 === 0
        ? "Current list of Groups and User Accounts granted the 'Deny logon as a service' right"
        : `Control statement sample ${i}`,
      qds: 80 + (i % 20),
      technology: 'Windows 2016 Server',
      asset: `SRV-VIRTUAL-${(i % 50).toString().padStart(2, '0')}`,
      policy: 'NIST 800-53 (Special Publication)',
      date: 'Oct 7, 2024'
    })
  }
})
</script>

<style scoped>
.security-dashboard {
  background-color: #f8f9fa;
}

.layout-wrapper {
  display: flex;
  gap: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Left Sidebar */
.left-sidebar {
  flex: 0 0 240px;
  max-width: 240px;
  position: sticky;
  top: 16px;
  height: calc(100vh - 80px);
}

.nav-collapsed .left-sidebar {
  flex: 0 0 48px;
  max-width: 48px;
}

/* Hero Card with overflow toggle */
.hero-card {
  position: relative;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible !important; /* Allow overflow */
}

.hero-content {
  text-align: center;
  width: 100%;
  position: relative;
  z-index: 1;
}

.hero-toggle-overflow {
  position: absolute !important;
  top: 50%;
  right: -12px; /* This makes it stick out */
  transform: translateY(-50%);
  background: white !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  z-index: 10;
  min-width: 24px !important;
  width: 24px !important;
  height: 24px !important;
  border: 1px solid #e0e0e0;
}

.hero-toggle-overflow:hover {
  background: #f5f5f5 !important;
}

.hero-number {
  font-size: 40px;
  font-weight: 500;
  line-height: 1;
  color: #000;
}

.hero-label {
  color: #6c757d;
  font-weight: 500;
  font-size: 11px;
}

.hero-toggle {
  position: absolute !important;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  background: white !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  z-index: 10;
  min-width: 24px !important;
  width: 24px !important;
  height: 24px !important;
}

/* Filters Panel */
.filters-panel {
  overflow-y: auto;
  max-height: calc(100vh - 160px);
}

.nav-section {
  margin-bottom: 16px;
}

.nav-title {
  font-size: 9px;
  font-weight: 700;
  color: #adb5bd;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  padding-bottom: 3px;
  border-bottom: 1px solid #e0e0e0;
}

.filter-group {
  margin-bottom: 10px;
}

.filter-label {
  font-size: 10px;
  font-weight: 600;
  color: #6c757d;
  margin-bottom: 3px;
}

.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.stats-container {
  background: #e6f2ff;
  border-radius: 6px;
  padding: 6px;
}

.stat-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
  font-size: 10px;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin-right: 4px;
}

.dot.remediable {
  background: #28a745;
}

.dot.non-remediable {
  background: #dc3545;
}

.stat-label {
  flex: 1;
  color: #6c757d;
}

.stat-value {
  font-weight: 700;
  color: #0066cc;
  font-size: 10px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Compact form elements */
:deep(.compact-select .v-field) {
  font-size: 11px;
  min-height: 32px;
}

:deep(.compact-text-field .v-field) {
  font-size: 11px;
  min-height: 32px;
}

/* Collapsed Sidebar - Azure Style */
.collapsed-sidebar {
  position: relative;
  height: 100%;
  width: 100%;
}

.hover-trigger {
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 15;
  background: transparent;
  transition: all 0.2s ease;
}

.hover-trigger:hover {
  background: rgba(0, 102, 204, 0.05);
}

.chevron-icon {
  transition: transform 0.2s ease;
}

.hover-trigger:hover .chevron-icon {
  transform: translateX(2px);
  color: #0066cc !important;
}

.highlight-bar {
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: #0066cc;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.hover-trigger:hover + .highlight-bar {
  opacity: 0.7;
}

/* Main Content */
.main-content {
  flex: 0 0 calc(100% - 256px);
  max-width: calc(100% - 256px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 0.2);
}

.main-content.full-width {
  flex: 0 0 calc(100% - 64px);
  max-width: calc(100% - 64px);
}

/* Search Bar */
.search-bar {
  border: 1px solid #e2e8f0;
}

.scope-selector {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  color: #1e293b;
  cursor: pointer;
  padding: 0 6px;
}

.search-divider {
  width: 1px;
  height: 24px;
  background: #e2e8f0;
  margin: 0 8px;
}

/* Metrics */
.metric-card {
  border: 1px solid #e5e7eb;
}

.metric-title {
  font-size: 12px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
}

.audit-score-block {
  margin-bottom: 8px;
}

.audit-label {
  font-size: 10px;
  color: #6b7280;
}

.audit-score-value {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}

.audit-stats {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #374151;
}

/* Bar Chart */
.bar-chart-container {
  display: flex;
  height: 100px;
  align-items: stretch;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 9px;
  color: #6b7280;
  margin-right: 6px;
}

.bars {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex: 1;
  height: 100%;
  padding-bottom: 16px;
  border-left: 1px dotted #d1d5db;
  border-bottom: 1px dotted #d1d5db;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}

.bar {
  width: 8px;
  max-height: 100%;
  margin-bottom: 3px;
}

.bar.serious { background: #d1242f; }
.bar.critical { background: #a50f15; }
.bar.medium { background: #facc15; }
.bar.urgent { background: #f97316; }
.bar.minimal { background: #60a5fa; }
.bar.unknown { background: #9ca3af; }

.bar-group span {
  font-size: 9px;
  color: #374151;
  white-space: nowrap;
}

/* Table */
.table-card {
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #e6f2ff;
  border-bottom: 1px solid #e0e0e0;
}

.table-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.table-search {
  width: 200px;
}

.table-search :deep(.v-field) {
  min-height: 32px;
  font-size: 11px;
}

.status-chip {
  min-width: 45px;
  justify-content: center;
  font-size: 9px !important;
  height: 20px !important;
}

.qds-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 11px;
}

.qds-badge.high {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
  border: 1px solid rgba(40, 167, 69, 0.3);
}

.qds-badge.medium {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.qds-badge.low {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  border: 1px solid rgba(220, 53, 69, 0.3);
}

.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: #e6f2ff;
  border-top: 1px solid #e0e0e0;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-size-select {
  width: 80px;
}

.page-size-select :deep(.v-field) {
  min-height: 30px;
  font-size: 11px;
}

.page-info {
  color: #6c757d;
  font-size: 11px;
}

/* Responsive */
@media (max-width: 1200px) {
  .layout-wrapper {
    flex-direction: column;
  }

  .left-sidebar,
  .main-content,
  .main-content.full-width {
    flex: 0 0 100%;
    max-width: 100%;
    position: static;
    height: auto;
  }
}

@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .table-controls {
    width: 100%;
    flex-direction: column;
  }

  .table-search {
    width: 100%;
  }

  .table-footer {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .footer-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>