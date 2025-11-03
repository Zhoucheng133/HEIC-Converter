<template>
  <SelectView v-if="store().files.length==0" />
  <ListView v-else />
</template>

<script setup lang="ts">
import store from './store';
import SelectView from './components/SelectView.vue';
import ListView from './components/ListView.vue';


</script>