<script setup lang="ts">
  import { ref} from 'vue';
  import { useSettingsStore } from '@/stores/settings';
  import { useCalorificStore } from '@/stores/calorific';

  const settingsStore = useSettingsStore();
  const calorificStore = useCalorificStore();

  const activityList = [
    {name: 'Минимальные нагрузки (сидячая работа)', value: 1.2}, 
    {name: 'Необременительные тренировки 3 раза в неделю', value: 1.375},
    {name: 'Тренировки 5 раз в неделю (работа средней тяжести)', value: 1.4625},
    {name: 'Интенсивные тренировки 5 раз в неделю', value: 1.550},
    {name: 'Ежедневные тренировки', value: 1.6375},
    {name: 'Ежедневные интенсивные тренировки или занятия 2 раза в день', value: 1.725},
    {name: 'Тяжелая физическая работа или интенсивные тренировки 2 раза в день', value: 1.9},
  ];
  const activity = ref();
</script>

<template>
  <div class="py-4">
    <v-alert color="#7E57C2" variant="tonal">
      Ваш вес {{ settingsStore.getSettings.weight }} кг, рост {{ settingsStore.getSettings.height }} см и возраст {{ settingsStore.getSettings.age }} лет.<br/><br/>
      <v-select
          v-model="activity"
          :items="activityList"
          item-title="name"
          item-value="value"
          :rules="[v => !!v || 'Уровень физической нагрузки обязательное поле']"
          label="Выберите уровень физической нагрузки"
          required
          density='compact'
        ></v-select>
      <div v-if="activity">
        По формуле Маффина-Джеора ваша дневная калорийность составляет {{ calorificStore.calculateCalorific(activity) }} ккал.
      </div>  
    </v-alert>
  </div>  
</template>

<style>

</style>