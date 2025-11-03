<template>
  <div class="select_bg">
    <i class="pi pi-upload"></i>
    <div class="label">拖拽文件/目录到这里</div>
  </div>
</template>

<script lang="ts" setup>
import { listen } from '@tauri-apps/api/event';
import { onBeforeUnmount, onMounted } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import store, { ConvertStatus } from '../store';
import { message } from '@tauri-apps/plugin-dialog';
import { basename } from '@tauri-apps/api/path';
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
        await message('没有找到HEIC文件', { title: '文件/目录无效', kind: 'error' });
        return;
      }

      const files = await Promise.all(
        resolveFiles.map(async (item) => {
          const name = await basename(item);
          return {
            name,
            path: item,
            status: ConvertStatus.wait,
          };
        })
      );

      store().files = files;
      
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