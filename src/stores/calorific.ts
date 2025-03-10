import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { dishValues, calorificValues } from '../mock_data/calorific.ts';
import { useSettingsStore } from './settings.ts';

type Dish = {
  id: number
  name: string
  kcal: number
  fat: number
  carbohydrate: number
  protein: number
}

type Calorific = {
  date: string
  quantity: number
  dishId: number
}

type CalorificSumm = {
  date: string
  calorific: number
}

interface dataGraph {
  [index: string]: number;
}

export const useCalorificStore = defineStore('calorific', () => {
  const dishes = ref<Dish[]>(dishValues);
  const calorific = ref<Calorific[]>(calorificValues);
  const calculatedCalorific = ref<number>(0);

  const settingsStore = useSettingsStore();

  const getGraphData = computed(() => {
    const data = calorific.value.reduce(
      (res, curr) => {
        let summ = kcalByDish(curr) * curr.quantity
        !res.hasOwnProperty(curr.date) ? res[curr.date] = summ : res[curr.date] += summ;
        return res;
      },
      <dataGraph>{}
    );

    return {
      labels: Object.keys(data), 
      datasets: Object.values(data), 
      height: (Object.keys(data).length * 25) + 80};
  })  

  function calculateCalorific(activity: number): number {
    const base = (10 * settingsStore.getSettings.weight) + (6.25 * settingsStore.getSettings.height) - (5 * settingsStore.getSettings.age);
    calculatedCalorific.value = Math.round((settingsStore.getSettings.gender === 'female' ? base - 161 : base + 5) * activity);
    return calculatedCalorific.value;
  }

  function kcalByDish(current: Calorific): number{
    return dishes.value.find(dish => dish.id === current.dishId)?.kcal || 0;
  }

  function saveDish(newValue: Dish) {
    dishes.value.push(newValue);
  }

  function saveCalorific(newValue: Calorific) {
    calorific.value.push(newValue);
  }

  return { dishes, calculatedCalorific, calculateCalorific, saveDish, saveCalorific, getGraphData }
})