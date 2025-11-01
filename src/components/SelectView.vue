<template>
  <div class="select_bg">
    <Button class="select_button" icon="pi pi-plus" rounded size="large" variant="text"/>
    <div class="label">添加或拖拽文件/目录到这里</div>
  </div>

  <Dialog v-model:visible="visible" modal header="无法识别" :style="{ width: '20rem' }" :closable="false">
    当前的文件无法被处理
    <div class="flex justify-end gap-2">
        <Button type="button" label="好的"  @click="visible = false" size="small"></Button>
    </div>
</Dialog>
</template>

<script lang="ts" setup>
import { listen } from '@tauri-apps/api/event';
import { Button, Dialog } from 'primevue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import store from '../store';

let visible=ref(false);

let unlisten: any;

onMounted(async () => {
  unlisten = await listen('tauri://drag-drop', async (event: any) => {
    const payload = event?.payload;
    if (
      payload &&
      typeof payload === 'object' &&
      Array.isArray(payload.paths) &&
      typeof payload.paths[0] === 'string'
    ) {
      const file = payload.paths[0];

      const type = await invoke('check_path', { path: file });

      if(type=="file"){
        if(!file.toLowerCase().endsWith(".heic")){
          visible.value=true;
          return;
        }
      }
      store().path=file;
    }
  });
});

onBeforeUnmount(() => {
  if (unlisten) unlisten();
});
</script>

<style scoped>
.label{
  font-size: 15px;
  margin-bottom: 30px;
}
.select_button{
  margin-bottom: 5px;
}
.select_bg{
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
  flex-direction: column;
}
</style>