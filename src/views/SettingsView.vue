<script setup lang="ts">
  import { ref } from 'vue';
  import { useSettingsStore } from '@/stores/settings';

  const settingsStore = useSettingsStore();

  const form = ref();
  
  const height = ref(settingsStore.getSettings.height);
  const heightRules = ref([
    (v: number) => !!v || 'Рост обязательное поле',
    (v: string) => !(/[^0-9]/.test(v)) || 'Рост должен быть числом',
  ]);

  const weight = ref(settingsStore.getSettings.weight);
  const weightRules = ref([
    (v: number) => !!v || 'Вес обязательное поле',
    (v: string) => !(/[^0-9]/.test(v)) || 'Вес должен быть числом',
  ]);

  const age = ref(settingsStore.getSettings.age);
  const ageRules = ref([
    (v: number) => !!v || 'Возраст обязательное поле',
    (v: string) => !(/[^0-9]/.test(v)) || 'Возраст должен быть числом',
  ]);

  const genderList = [{name: 'мужской', value: 'male'}, {name: 'женский', value: 'female'}];
  const gender = ref(settingsStore.getSettings.gender);

  const calorific = ref(settingsStore.getSettings.calorific);
  const calorificRules = ref([
    (v: string) => !(/[^0-9]/.test(v)) || 'Калорийность должна быть числом',
  ]);

  const submitSuccess = ref(false);

  async function submitForm () {
    const { valid } = await form.value.validate()

    if (!valid) {
      return false;
    }

    settingsStore.saveSettings({
      height: height.value,
      weight: weight.value,
      age: age.value,
      gender: gender.value,
      calorific: calorific.value || 0
    });

    submitSuccess.value = true;

    return true;
  }
</script>

<template>
  <div class="settings">
    <h2>Настройки</h2>
    <div v-if="submitSuccess" class="py-4">
      <v-alert color="#7E57C2" variant="outlined">
        Изменения сохранены.
      </v-alert>
    </div>  

    <v-sheet class="mx-auto" width="300">
      <v-form ref="form" @submit.prevent="submitForm">
        <v-text-field
          v-model.number="height"
          :rules="heightRules"
          label="Введите рост"
          required
          density='compact'
        ></v-text-field>

        <v-text-field
          v-model.number="weight"
          :rules="weightRules"
          label="Введите вес"
          required
          density='compact'
        ></v-text-field>

        <v-text-field
          v-model.number="age"
          :rules="ageRules"
          label="Введите рост"
          required
          density='compact'
        ></v-text-field>

        <v-select
          v-model="gender"
          :items="genderList"
          item-title="name"
          item-value="value"
          :rules="[v => !!v || 'Пол обязательное поле']"
          label="Выберите пол"
          required
          density='compact'
        ></v-select>

        <v-text-field
          v-model.number="calorific"
          :rules="calorificRules"
          label="Введите желаемую калорийность"
          density='compact'
        ></v-text-field>

        <div class="d-flex flex-column">
          <v-btn
            color="deep-purple"
            block
            type="submit"
          >
            Сохранить настройки
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<style>

</style>
