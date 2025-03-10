<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useCalorificStore } from '@/stores/calorific';

  const calorificStore = useCalorificStore();

  const form = ref();
  
  const date = ref(new Date());
  const menuActive = ref(false)

  const dishList = calorificStore.dishes;
  const dish = ref();  
  const dishRules = ref([
    (v: number | string) => !!v || 'Прием пищи обязательное поле'
  ]);

  const quantity = ref();
  const quantityRules = ref([
    (v: number) => !!v || 'Количество пищи обязательное поле',
    (v: string) => !(/[^0-9]/.test(v)) || 'Количество пищи должно быть числом',
  ]);

  const submitSuccess = ref(false);

  const dialog = ref(false);
  const formDish = ref();

  const dishName = ref();  
  const dishNameRules = ref([
    (v: number | string) => !!v || 'Наименование обязательное поле'
  ]);

  const kcal = ref();  
  const kcalRules = ref([
    (v: number) => !!v || 'Калорийность обязательное поле',
    (v: string) => (/^[0-9]+\.?[0-9]*$/.test(v)) || 'Калорийность должна быть числом',
  ]);

  const protein = ref();  
  const proteinRules = ref([
    (v: number) => !!v || 'Белки обязательное поле',
    (v: string) => (/^[0-9]+\.?[0-9]*$/.test(v)) || 'Белки должно быть числом',
  ]);

  const fat = ref();  
  const fatRules = ref([
    (v: number) => !!v || 'Жиры обязательное поле',
    (v: string) => (/^[0-9]+\.?[0-9]*$/.test(v)) || 'Жиры должно быть числом',
  ]);

  const carbohydrate = ref();
  const carbohydrateRules = ref([
    (v: number) => !!v || 'Углеводы обязательное поле',
    (v: string) => (/^[0-9]+\.?[0-9]*$/.test(v)) || 'Углеводы должно быть числом',
  ]);

  async function submitForm () {
    submitSuccess.value = false;
    const { valid } = await form.value.validate()

    if (!valid) {
      return false;
    }

    calorificStore.saveCalorific({
      date: getStrDt(date.value),
      quantity: quantity.value,
      dishId: dish.value,
    });

    submitSuccess.value = true;

    date.value = new Date();
    quantity.value = null;
    dish.value = null;

    return true;
  }

  async function submitFormDish () {
    const { valid } = await formDish.value.validate()

    if (!valid) {
      return false;
    }

    calorificStore.saveDish({
      id: dishList.length + 1,
      name: dishName.value,
      kcal: kcal.value / 100,
      fat: fat.value / 100,
      carbohydrate: carbohydrate.value / 100,
      protein: protein.value / 100
    });

    dishName.value = null;
    kcal.value = null;
    protein.value = null;
    fat.value = null;
    carbohydrate.value = null;

    dialog.value = false;

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

  function saveDish () {
    dialog.value = false;
  }
</script>

<template>
  <div class="add">
    <h2>Добавить прием пищи</h2>
    <div v-if="submitSuccess" class="py-4">
      <v-alert color="#7E57C2" variant="outlined">
        Прием пищи добавлен.
      </v-alert>
    </div>  

    <v-sheet class="mx-auto">
      <v-form ref="form" @submit.prevent="submitForm">
        <v-row>
          <v-col sm="2">
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
            <v-autocomplete
              v-model="dish"
              :items="dishList"
              item-title="name"
              item-value="id"
              :rules="dishRules"
              label="Выберите продукт*"
              density='compact'
              clearable
            >
            <template v-slot:append>
              <v-dialog
                v-model="dialog"
                max-width="600"
                transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    class="mt-1"
                    color="deep-purple"
                    block
                    v-bind="activatorProps"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                </template>

                <v-card title="Добавить продукт">
                  <v-card-text>
                    <v-form ref="formDish" @submit.prevent="submitFormDish">
                      <v-row dense>
                        <v-col sm="6">
                          <v-text-field
                            label="Наименование*"
                            v-model="dishName"
                            :rules="dishNameRules"
                            density='compact'
                          ></v-text-field>
                        </v-col>

                        <v-col sm="6" >
                          <v-text-field
                            hint="на 100 грамм продукта"
                            label="Калорийность, ккал.*"
                            v-model="kcal"
                            :rules="kcalRules"
                            density='compact'
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col sm="4">
                          <v-text-field
                            hint="на 100 грамм продукта"
                            label="Белки, гр.*"
                            v-model="protein"
                            :rules="proteinRules"
                            density='compact'
                          ></v-text-field>
                        </v-col>

                        <v-col sm="4">
                          <v-text-field
                            hint="на 100 грамм продукта"
                            label="Жиры, гр.*"
                            v-model="fat"
                            :rules="fatRules"
                            density='compact'
                          ></v-text-field>
                        </v-col>

                        <v-col sm="4">
                          <v-text-field
                            hint="на 100 грамм продукта"
                            label="Углеводы, гр.*"
                            v-model="carbohydrate"
                            :rules="carbohydrateRules"
                            density='compact'
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>  
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-btn
                      text="Закрыть"
                      class="mt-1"
                      color="deep-purple"
                      @click="dialog = false"
                    ></v-btn>

                    <v-btn
                      text="Сохранить"
                      class="mt-1"
                      color="deep-purple"
                      variant="elevated"
                      @click="submitFormDish"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-autocomplete>
          </v-col>
          <v-col sm="4">
            <v-text-field
              v-model.number="quantity"
              :rules="quantityRules"
              label="Введите количество в гр.*"
              required
              density='compact'
            ></v-text-field>
          </v-col>
          <v-col sm="2">
            <div class="d-flex flex-column">
              <v-btn
                class="mt-1"
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
.v-card-title {
  color: rgb(126, 87, 194);;
}
</style>
