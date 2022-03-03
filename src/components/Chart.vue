<template>
  <div>
    <canvas id="planet-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'PlanetChart',
  props: {
    chartData: {
      type: Object,
      default: null
    },
  },
  created() {
  },
  mounted() {
    const ctx = document.getElementById('planet-chart');
    new Chart(ctx, this.chartData);
  },
}
</script>
<style scoped>
#planet-chart {
  width: auto !important;
  height: auto !important;
}
</style>