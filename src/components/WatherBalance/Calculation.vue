<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useSettingsStore } from '@/stores/settings';

  const settingsStore = useSettingsStore();

  const wather_balance = computed(() => settingsStore.getSettings.weight * 30);
</script>

<template>
  <div class="py-4">
    <v-alert color="#7E57C2" variant="tonal">
      Ваш вес {{ settingsStore.getSettings.weight }} кг.<br/>
      Необходимое потребление воды в день для вас {{ wather_balance }} мл.
    </v-alert>
  </div>  
</template>

<style>

</style>
