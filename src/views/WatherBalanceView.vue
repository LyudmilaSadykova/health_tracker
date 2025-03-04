<script setup lang="ts"> 
  import Graph from '@/components/WatherBalance/Graph.vue';
  import Calculation from '../components/WatherBalance/Calculation.vue';
  import AddWather from '../components/WatherBalance/AddWather.vue';
</script>

<template>
  <div class="wather_balance">
    <h2>Баланс воды</h2>
    <Calculation />
    <Graph />
    <AddWather />
  </div>
</template>

<style>

</style>