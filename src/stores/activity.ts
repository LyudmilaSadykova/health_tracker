import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { activityValues } from '../mock_data/activity.ts';

type Activity = {
  date: string
  kcal: number
}

interface dataGraph {
  [index: string]: Activity;
}

export const useActivityStore = defineStore('activity', () => {
  const activity = ref<Activity[]>(activityValues);

  const getGraphData = computed(() => {
    let data = activity.value.reduce(function (res, current) {
      if (!res.hasOwnProperty(current.date))
          res[current.date] = {
            date: current.date,
            kcal: current.kcal,
          };
      else {
          res[current.date].kcal += current.kcal;
      }

      return res;
    }, <dataGraph>{});

    let datasets: number[] = [];
    Object.keys(data).forEach(function(key) {
      datasets.push(data[key].kcal);
    });

    return {labels: Object.keys(data), datasets: datasets, height: (datasets.length * 25) + 80};
  })

  function saveActivity(newValue: Activity) {
    activity.value.push(newValue);
  }

  return { activity, getGraphData, saveActivity }
})