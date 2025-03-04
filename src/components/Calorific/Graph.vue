<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useCalorificStore } from '@/stores/calorific';
  import { useSettingsStore } from '@/stores/settings';
  import MixedChart from '../MixedChart.vue';
  import { optionsChart } from '../ChartConfig';

  const calorificStore = useCalorificStore();
  const settingsStore = useSettingsStore();

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'

  //import { Bar } from 'vue-chartjs'

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  const calorific = computed(() => settingsStore.getSettings.calorific);

  const computedDataChart = computed(() => {
    if (calorific.value) 
      return {
        labels: calorificStore.getGraphData.labels,
        datasets: [
          {
            type: 'bar',
            label: 'График суточной калорийности',
            backgroundColor: '#9575CD',
            data: calorificStore.getGraphData.datasets,
            order: 2,
          },
          {
            type: 'line',
            label: 'Желаемое потребеление калорий',
            backgroundColor: "#311B92",
            data:  Object.keys(calorificStore.getGraphData.labels).map((str) => {
                return calorific.value;
            }),
            order: 1,
            borderColor: "#311B92",
            pointStyle: false
          }
        ]
      }
    else
      return {
        labels: calorificStore.getGraphData.labels,
        datasets: [
        {
          type: 'bar',
          label: 'График суточной калорийности',
          backgroundColor: '#9575CD',
          data: calorificStore.getGraphData.datasets,
          order: 1,
        }
      ]}
  })
</script>

<template>
  <div>
    <MixedChart
      :chartOptions="optionsChart"
      :chartData="computedDataChart"
      chartId="graph_calorific"
      :styleHeight="'height: ' + calorificStore.getGraphData.height + 'px'"
    />
    <!-- <Bar 
      :data="computedDataChart" 
      :options="optionsChart" 
      :style="'height: ' + calorificStore.getGraphData.height + 'px;'" 
    /> -->
  </div>
</template>

<style scoped>

</style>