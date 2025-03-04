<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useWatherBalanceStore } from '@/stores/wather_balance';
  import { useSettingsStore } from '@/stores/settings';
  import MixedChart from '../MixedChart.vue';
  import { optionsChart } from '../ChartConfig';

  const watherBalanceStore = useWatherBalanceStore();
  const settingsStore = useSettingsStore();

  // import {
  //   Chart as ChartJS,
  //   Title,
  //   Tooltip,
  //   Legend,
  //   BarElement,
  //   CategoryScale,
  //   LinearScale
  // } from 'chart.js'

  //import { Bar } from 'vue-chartjs'

  //ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  // const computedDataChart = computed(() => {
  //   return {
  //       labels: watherBalanceStore.getGraphData.labels,
  //       datasets: [
  //       {
  //           label: 'График баланса воды',
  //           backgroundColor: '#9575CD',
  //           data: watherBalanceStore.getGraphData.datasets
  //       }
  //   ]}
  // })

  const wather_balance = computed(() => settingsStore.getSettings.weight * 30);

  const computedDataChart = computed(() => {
    return {
      labels: watherBalanceStore.getGraphData.labels,
      datasets: [
        {
          type: 'bar',
          label: 'График баланса воды',
          backgroundColor: '#9575CD',
          data: watherBalanceStore.getGraphData.datasets,
          order: 2,
        },
        {
          type: 'line',
          label: 'Необходимое потребление воды',
          backgroundColor: "#311B92",
          data:  Object.keys(watherBalanceStore.getGraphData.labels).map((str) => {
              return wather_balance.value;
          }),
          order: 1,
          borderColor: "#311B92",
          pointStyle: false
        }
      ]
    } 
  })

</script>

<template>
  <div>
    <MixedChart
      :chartOptions="optionsChart"
      :chartData="computedDataChart"
      chartId="graph_wather"
      :styleHeight="'height: ' + watherBalanceStore.getGraphData.height + 'px'"
    />
    <!-- <Bar 
      :data="computedDataChart" 
      :options="optionsChart" 
      :style="'height: ' + watherBalanceStore.getGraphData.height + 'px;'" 
    /> -->
  </div>
</template>

<style scoped>

</style>