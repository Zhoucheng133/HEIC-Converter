<template>
  <div class="select_bg">
    <i class="pi pi-upload"></i>
    <div class="label">拖拽文件/目录到这里</div>
  </div>

  <Dialog v-model:visible="visible" modal header="无法识别" :style="{ width: '20rem' }" :closable="false">
    当前的文件/目录无法被处理
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
import store, { ConvertStatus } from '../store';

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
      const targets = payload.paths;

      const resolveFiles: Array<string> = await invoke('resolve_files', { paths: targets });
      
      if(resolveFiles.length==0){
        visible.value=true;
        return;
      }

      store().files=resolveFiles.map((item)=>{
        return {
          path: item,
          status: ConvertStatus.wait,
        }
      });
      
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
  margin-top: 15px;
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