<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useWatherBalanceStore } from '@/stores/wather_balance';

  const watherBalanceStore = useWatherBalanceStore();

  const form = ref();
  
  const date = ref(new Date());
  const menuActive = ref(false)

  const ml = ref();
  const mlRules = ref([
    (v: number) => !!v || 'Количество воды обязательное поле',
    (v: string) => !(/[^0-9]/.test(v)) || 'Количество воды должно быть числом',
  ]);

  const submitSuccess = ref(false);

  async function submitForm () {
    submitSuccess.value = false;
    const { valid } = await form.value.validate()

    if (!valid) {
      return false;
    }

    watherBalanceStore.saveWatherBalance({
      date: getStrDt(date.value),
      ml: ml.value,
    });

    submitSuccess.value = true;

    date.value = new Date();
    ml.value = null;

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
    <h2>Добавить прием воды</h2>
    <div v-if="submitSuccess" class="py-4">
      <v-alert color="#7E57C2" variant="outlined">
        Вода добавлена.
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
            v-model.number="ml"
            :rules="mlRules"
            label="Введите воду в мл.*"
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
