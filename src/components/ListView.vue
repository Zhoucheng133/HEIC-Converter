<template>
  <div class="list_page">
    <div class="menu w-full">
      <ButtonGroup class="w-full">
        <Button :label="$t('convert')" icon="pi pi-play" size="small" class="flex-1" :disabled="store().running" @click="store().convertHandler" />
        <Button :label="$t('stop')" icon="pi pi-stop" size="small" class="flex-1" :disabled="!store().running" @click="store().stop" />
        <Button :label="$t('close')" icon="pi pi-times" size="small" class="flex-1" @click="closeFiles" />
      </ButtonGroup>
    </div>
    <div class="content">
      <TaskItem v-for="(item, index) in store().files" :key="index" :task-item="item"/>
    </div>
    <div class="options">
      <div class="option_item flex items-center gap-2">
        <Checkbox v-model="store().useExif" inputId="exif" binary @value-change="exifChangeHandler"/>
        <label for="exif">{{ $t("keepExif") }}</label>
      </div>
      <div class="option_item flex items-center gap-2">
        <Checkbox v-model="store().override" inputId="override" binary @value-change="overrideChangeHandler"/>
        <label for="override">{{ $t("override") }}</label>
      </div>
    </div>
    <div class="output_area">
      <InputGroup>
        <InputText v-model="store().outputDir" size="small" :filled="true" />
        <Button size="small" @click="selectOutput">{{ $t("select") }}</Button>
      </InputGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '../store';
import TaskItem from './TaskItem.vue';
import { Checkbox, InputText, Button, InputGroup, ButtonGroup } from 'primevue';
import { open } from '@tauri-apps/plugin-dialog';

const exifChangeHandler=(val: boolean)=>{
  localStorage.setItem("exif", String(val));
}

const overrideChangeHandler=(val: boolean)=>{
  localStorage.setItem("override", String(val));
}

const selectOutput=async ()=>{
  const dir = await open({
    multiple: false,
    directory: true,
  });
  if(dir!=null){
    store().outputDir=dir;
    localStorage.setItem("output", dir);
  }
}

const closeFiles=()=>{
  store().files=[];
}
</script>

<style scoped>
.output_area{
  display: flex;
}
.options{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 10px;
}
.content{
  overflow: auto;
  flex: 1;
  margin-top: 10px;
}
.list_page{
  padding: 10px;
  user-select: none;
  -webkit-user-select: none;
  display: grid;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
</style>