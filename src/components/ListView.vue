<template>
  <div class="list_page">
    <div class="menu w-full">
      <ButtonGroup class="w-full">
        <Button label="转换" icon="pi pi-play" size="small" class="flex-1" />
        <Button label="停止" icon="pi pi-stop" size="small" class="flex-1" />
        <Button label="关闭" icon="pi pi-times" size="small" class="flex-1" @click="closeFiles" />
      </ButtonGroup>
    </div>
    <div class="content">
      <TaskItem v-for="(item, index) in store().files" :key="index" :task-item="item"/>
    </div>
    <div class="options">
      <div class="option_item flex items-center gap-2">
        <Checkbox v-model="store().useExif" inputId="exif" binary/>
        <label for="exif">保留EXIF信息</label>
      </div>
      <div class="option_item flex items-center gap-2">
        <Checkbox v-model="store().override" inputId="override" binary/>
        <label for="override">覆盖已有文件</label>
      </div>
    </div>
    <div class="output_area">
      <InputGroup>
        <InputText v-model="store().outputDir" size="small" :filled="true" />
        <Button size="small">选择</Button>
      </InputGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from '../store';
import TaskItem from './TaskItem.vue';
import { Checkbox, InputText, Button, InputGroup, ButtonGroup } from 'primevue';

const closeFiles=()=>{
  store().files=[];
}
</script>

<style scoped>
.output_area{
  margin-top: 10px;
  display: flex;
}
.options{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
}
.content{
  height: calc(100vh - 150px);
  overflow: scroll;
  margin-top: 10px;
}
.list_page{
  padding: 10px;
  user-select: none;
  -webkit-user-select: none;
}
</style>