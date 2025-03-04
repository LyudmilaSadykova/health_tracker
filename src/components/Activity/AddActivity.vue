<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useActivityStore } from '@/stores/activity';

  const activityStore = useActivityStore();

  const form = ref();
  
  const date = ref(new Date());
  const menuActive = ref(false)

  const kcal = ref();
  const kcalRules = ref([
    (v: number) => !!v || 'Количество калорий обязательное поле',
    (v: string) => !(/[^0-9]/.test(v)) || 'Количество калорий должно быть числом',
  ]);

  const submitSuccess = ref(false);

  async function submitForm () {
    submitSuccess.value = false;
    const { valid } = await form.value.validate()

    if (!valid) {
      return false;
    }

    activityStore.saveActivity({
      date: getStrDt(date.value),
      kcal: kcal.value,
    });

    submitSuccess.value = true;

    date.value = new Date();
    kcal.value = null;

    return true;
  }

  const computedDate = computed(() => date.value ? getStrDt(date.value) : '');

  function getStrDt (str: string | Date) {
    const dt = new Date(str);
    return dt.getFullYear() + '-' + _addZero(dt.getMonth() + 1) + '-' + _addZero(dt.getDate());
  }

  function _addZero (n: number) {
      return n > 9 ? n : '0' + n;
  }
</script>

<template>
  <div class="add">
    <h2>Добавить расход энергии</h2>
    <div v-if="submitSuccess" class="py-4">
      <v-alert color="#7E57C2" variant="outlined">
        Расход добавлен.
      </v-alert>
    </div>  

    <v-sheet class="mx-auto">
      <v-form ref="form" @submit.prevent="submitForm">
        <v-row>
          <v-col sm="4">
            <v-menu
                v-model="menuActive"
                :close-on-content-click="false"
                min-width="auto"
                transition="scale-transition"
            >
                <template v-slot:activator="{ props }">
                    <v-text-field
                        :model-value="computedDate"
                        label="Выберите дату*"
                        append-inner-icon="event"
                        readonly
                        v-bind="props"
                        density='compact'
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                    locale="ru-RU"
                    first-day-of-week="1"
                    color="deep-purple-lighten-1"
                    @update:modelValue="menuActive = false"
                >
                </v-date-picker>
            </v-menu>
          </v-col>
          <v-col sm="4">
            <v-text-field
            v-model.number="kcal"
            :rules="kcalRules"
            label="Введите расход в ккал.*"
            required
            density='compact'
            ></v-text-field>
          </v-col>
          <v-col sm="4">
            <div class="d-flex flex-column">
              <v-btn
                color="deep-purple"
                block
                type="submit"
              >
                Добавить 
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </div>
</template>

<style>

</style>
