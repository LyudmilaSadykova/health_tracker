<script setup lang="ts"> 
  import Graph from '@/components/Activity/Graph.vue';
  import Calculation from '@/components/Activity/Calculation.vue';
  import AddActivity from '@/components/Activity/AddActivity.vue';
</script>

<template>
  <div class="activity">
    <h2>Активность</h2>
    <Calculation />
    <Graph />
    <AddActivity />
  </div>
</template>

<style>

</style>