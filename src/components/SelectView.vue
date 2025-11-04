<template>
  <div class="select_bg">
    <i class="pi pi-upload"></i>
    <div class="flex mt-5" style="align-items: center;">
      <Button variant="link" @click="pickFiles(false)">选择文件</Button>
      <div>或</div>
      <Button variant="link" @click="pickFiles(true)">选择目录</Button>
    </div>
    <div class="label">也可以拖拽文件/目录到这里</div>
  </div>
  <div class="git">
    <i class="bi bi-github mr-2"></i>
    <div class="gitlabel" @click="toGitHub">本项目地址</div>
  </div>
</template>

<script lang="ts" setup>
import { listen } from '@tauri-apps/api/event';
import { onBeforeUnmount, onMounted } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import store, { ConvertStatus } from '../store';
import { message } from '@tauri-apps/plugin-dialog';
import { basename } from '@tauri-apps/api/path';
import { Button } from 'primevue';
import { openUrl } from '@tauri-apps/plugin-opener';
import { open } from '@tauri-apps/plugin-dialog';
let unlisten: any;

const toGitHub=()=>{
  openUrl("https://github.com/Zhoucheng133/HEIC-Converter");
}

async function pickFiles(useDir: boolean){
  const targets = await open({
    multiple: !useDir,
    directory: useDir,
  });
  if(targets!=null){
    if(useDir){
      fileHandler([targets])
    }else{
      fileHandler([...targets]);
    }
  }
}

async function fileHandler(targets: Array<string>){
  const resolveFiles: Array<string> = await invoke('resolve_files', { paths: targets });
  if(resolveFiles.length==0){
    await message('没有找到HEIC或HEIF文件', { title: '文件/目录无效', kind: 'error' });
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
      fileHandler(targets);
    }
  });
});

onBeforeUnmount(() => {
  if (unlisten) unlisten();
});
</script>

<style scoped>
.gitlabel{
  cursor: pointer;
}
.git{
  position: fixed;
  bottom: 10px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 13px;
}
.label{
  font-size: 15px;
  margin-bottom: 30px;
  /* margin-top: 15px; */
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