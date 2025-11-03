<template>
  <SelectView v-if="store().files.length==0" />
  <ListView v-else />
</template>

<script setup lang="ts">
import store from './store';
import SelectView from './components/SelectView.vue';
import ListView from './components/ListView.vue';
import { onMounted } from 'vue';

onMounted(()=>{
  const output=localStorage.getItem("output");
  if(output){
    store().outputDir=output;
  }
  const exif=localStorage.getItem("exif");
  if(exif){
    store().useExif=exif=='true';
  }
  const override=localStorage.getItem("override");
  if(override){
    store().override=override=='true';
  }
})

</script>