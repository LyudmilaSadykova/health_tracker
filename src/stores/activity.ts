import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { activityValues } from '../mock_data/activity.ts';

type Activity = {
  date: string
  kcal: number
}

interface dataGraph {
  [index: string]: number;
}

export const useActivityStore = defineStore('activity', () => {
  const activity = ref<Activity[]>(activityValues);

  const getGraphData = computed(() => {
    const data = activity.value.reduce(
      (res, curr) => {
        if (!(<any>Object).hasOwn(res, curr.date))
          res[curr.date] = curr.kcal
        else 
          res[curr.date] += curr.kcal;
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

  function saveActivity(newValue: Activity) {
    activity.value.push(newValue);
  }

  return { activity, getGraphData, saveActivity }
})