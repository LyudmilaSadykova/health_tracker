import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { watherBalanceValues } from '../mock_data/wather_balance.ts';

type WB = {
  date: string
  ml: number
}

interface dataGraph {
  [index: string]: number;
}

export const useWatherBalanceStore = defineStore('wather_balance', () => {
  const wather_balance = ref<WB[]>(watherBalanceValues);

  const getGraphData = computed(() => {
    const data = wather_balance.value.reduce(
      (res, curr) => {
        !res.hasOwnProperty(curr.date) ? res[curr.date] = curr.ml : res[curr.date] += curr.ml;
        return res;
      },
      <dataGraph>{}
    );

    return {
      labels: Object.keys(data), 
      datasets: Object.values(data), 
      height: (Object.keys(data).length * 25) + 80
    };
  })

  function saveWatherBalance(newValue: WB) {
    wather_balance.value.push(newValue);
  }

  return { wather_balance, getGraphData, saveWatherBalance }
})