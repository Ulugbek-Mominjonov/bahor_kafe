<template>
  <div>
    <canvas id="planet-chart2"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "PlanetChart2",
  props: {
    chartData: {
      type: Object,
      default: null,
    },
  },
  created() {},
  mounted() {
    const ctx = document.getElementById("planet-chart2");
    new Chart(ctx, this.chartData);
  },
};
</script>
<style scoped>
#planet-chart2 {
  width: auto !important;
  height: auto !important;
}
</style>