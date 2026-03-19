<template>
  <div class="progress-chart card">
    <h3>{{ title }}</h3>
    <div class="chart-container">
      <div class="chart-bars">
        <div 
          v-for="(item, index) in data" 
          :key="index"
          class="bar-wrapper"
        >
          <div 
            class="bar" 
            :style="{ height: getBarHeight(item.value) + '%' }"
            :title="item.label + ': ' + item.value + ' ' + unit"
          ></div>
          <div class="bar-label">{{ item.label }}</div>
        </div>
      </div>
    </div>
    <div v-if="showTotal" class="chart-total text-secondary">
      Total: {{ total }} {{ unit }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  valueKey: {
    type: String,
    default: 'value'
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  unit: {
    type: String,
    default: ''
  },
  showTotal: {
    type: Boolean,
    default: true
  }
})

const maxValue = computed(() => {
  return Math.max(...props.data.map(d => d[props.valueKey]), 1)
})

const total = computed(() => {
  return props.data.reduce((sum, d) => sum + d[props.valueKey], 0)
})

const getBarHeight = (value) => {
  if (maxValue.value === 0) return 0
  return (value / maxValue.value) * 100
}
</script>

<style scoped>
.progress-chart {
  padding: var(--spacing-lg);
}

.progress-chart h3 {
  margin-bottom: var(--spacing-lg);
}

.chart-container {
  height: 200px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  gap: var(--spacing-sm);
}

.bar-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: 60px;
}

.bar {
  width: 100%;
  background-color: var(--color-accent);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  min-height: 4px;
  transition: height var(--transition-normal);
}

.bar-label {
  font-size: 0.75rem;
  margin-top: var(--spacing-xs);
  color: var(--color-text-secondary);
  text-align: center;
}

.chart-total {
  margin-top: var(--spacing-md);
  text-align: right;
}
</style>
