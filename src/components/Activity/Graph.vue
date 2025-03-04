<script setup lang="ts">
  import { computed } from 'vue';
  import { useActivityStore } from '@/stores/activity';
  import { useCalorificStore } from '@/stores/calorific';
  import MixedChart from '../MixedChart.vue';
  import { optionsChart } from '../ChartConfig';

  const activityStore = useActivityStore();
  const calorificStore = useCalorificStore();

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

  const calculatedCalorific= computed(() => calorificStore.calculatedCalorific);

  const computedDataChart = computed(() => {
    if (calculatedCalorific.value)
    return {
        labels: activityStore.getGraphData.labels,
        datasets: [
          {
            type: 'bar',
            label: 'График суточного расхода энергии',
            backgroundColor: '#9575CD',
            data: activityStore.getGraphData.datasets,
            order: 2,
          },
          {
            type: 'line',
            label: 'Расход энергии по формуле Маффина-Джеора',
            backgroundColor: "#311B92",
            data:  Object.keys(activityStore.getGraphData.labels).map((str) => {
                return calculatedCalorific.value;
            }),
            order: 1,
            borderColor: "#311B92",
            pointStyle: false
          }
        ]
      }
    else
      return {
        labels: activityStore.getGraphData.labels,
        datasets: [
        {
          type: 'bar',
          label: 'График суточного расхода энергии',
          backgroundColor: '#9575CD',
          data: activityStore.getGraphData.datasets,
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
      chartId="graph_activity"
      :styleHeight="'height: ' + activityStore.getGraphData.height + 'px'"
    />
    <!-- <Bar 
      :data="computedDataChart" 
      :options="optionsChart" 
      :style="'height: ' + activityStore.getGraphData.height + 'px;'" 
    /> -->
  </div>
</template>

<style scoped>

</style>