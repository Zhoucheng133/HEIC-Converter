<template>
  <SelectView v-if="store().path.length==0" />
</template>

<script setup lang="ts">
import store from './store';
import SelectView from './components/SelectView.vue';


</script>