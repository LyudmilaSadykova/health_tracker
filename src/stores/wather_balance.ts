import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { watherBalanceValues } from '../mock_data/wather_balance.ts';

type WB = {
  date: string
  ml: number
}

interface dataGraph {
  [index: string]: WB;
}

export const useWatherBalanceStore = defineStore('wather_balance', () => {
  const wather_balance = ref<WB[]>(watherBalanceValues);

  // const getHeight = computed(() => {
  //   return (wather_balance.value.length * 25) + 80;
  // })

  // const getLabels = computed(() => {
  //   return wather_balance.value.map((str) => {
  //     return str.date;
  //   })
  // })

  // const getDataSet = computed(() => {
  //   return wather_balance.value.map((str) => {
  //     return str.ml;
  //   })
  // })

  const getGraphData = computed(() => {
    let data = wather_balance.value.reduce(function (res, current) {
      if (!res.hasOwnProperty(current.date))
          res[current.date] = {
            date: current.date,
            ml: current.ml,
          };
      else {
          res[current.date].ml += current.ml;
      }

      return res;
    }, <dataGraph>{});

    let datasets: number[] = [];
    Object.keys(data).forEach(function(key) {
      datasets.push(data[key].ml);
    });

    return {labels: Object.keys(data), datasets: datasets, height: (datasets.length * 25) + 80};
  })

  function saveWatherBalance(newValue: WB) {
    wather_balance.value.push(newValue);
  }

  return { wather_balance/*, getHeight, getLabels, getDataSet*/, getGraphData, saveWatherBalance }
})