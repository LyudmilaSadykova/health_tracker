<script setup>
  import { ref, computed, onMounted, watch} from 'vue';
  import Chart from 'chart.js/auto';

  const chart = ref();

  const props = defineProps({
    chartOptions: {
      type: Object,
      default: () => {},
      required: true
    },
    chartData: {
      type: Object,
      default: () => {},
      required: false
    },
    chartId: {
      type: String,
      default: '',
      required: false
    },
    styleHeight: {
      type: String,
      default: ''
    },
  })

  const chartDataValue = computed(() => props.chartData);
  const chartOptionsValue = computed(() => props.chartOptions);

  function chartDraw() {
    const ctx = document.getElementById(props.chartId);

    if (ctx) 
      chart.value = new Chart(ctx, {
        id: props.chartId,
        data: chartDataValue.value,
        options: chartOptionsValue.value
      });
  }

  onMounted(() => {
    chartDraw();
  })

  watch(chartDataValue, (newchartDataValue) => {
    if (chart.value) {
      chart.value.destroy();
      chartDraw();
    }
  })
</script>

<template>
    <div :style="props.styleHeight">
        <canvas :id="props.chartId"></canvas>
    </div>
</template>
