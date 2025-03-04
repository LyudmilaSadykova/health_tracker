import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import settingsValues from '../mock_data/settings.json';

interface ST {
  height: number
  weight: number
  age: number
  gender: string
  calorific: number
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<ST>(settingsValues);

  const getSettings = computed(() => {
    return settings.value;
  })

  function saveSettings(newSettings: ST) {
    settings.value = newSettings;
  }

  return { settings, getSettings, saveSettings }
})