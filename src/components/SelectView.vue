<template>
  <div class="top-right">
    <div class="control">
      <i class="bi bi-circle-half mr-3"></i>
      <Select v-model="themeMode" :options="themeOptions" optionLabel="label" optionValue="value" @change="changeTheme" size="small" />
    </div>
    <div class="control">
      <i class="bi bi-globe mr-3"></i>
      <Select v-model="selectedLocale" :options="langOptions" optionLabel="label" optionValue="value" @change="changeLocale" size="small" />
    </div>
  </div>
  <div class="select_bg">
    <i class="pi pi-upload"></i>
    <div class="flex mt-5" style="align-items: center;">
      <Button variant="link" @click="pickFiles(false)">{{ $t("selectFile") }}</Button>
      <div>{{ $t("or") }}</div>
      <Button variant="link" @click="pickFiles(true)">{{ $t("selectDir") }}</Button>
    </div>
    <div class="label">{{ $t("drop") }}</div>
  </div>
  <div class="git">
    <i class="bi bi-github mr-2"></i>
    <div class="gitlabel" @click="toGitHub">{{ $t("githubLink") }}</div>
  </div>
</template>

<script lang="ts" setup>
import { listen } from '@tauri-apps/api/event';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import store, { ConvertStatus } from '../store';
import { message } from '@tauri-apps/plugin-dialog';
import { basename } from '@tauri-apps/api/path';
import { Button, Select } from 'primevue';
import { openUrl } from '@tauri-apps/plugin-opener';
import { open } from '@tauri-apps/plugin-dialog';
import { useI18n } from 'vue-i18n';
import { themeMode, setThemeMode } from '../theme';
let unlisten: any;

const { t, locale } = useI18n();

const langOptions = [
  { label: '简体中文', value: 'zh-CN' },
  { label: '繁體中文 (台灣)', value: 'zh-TW' },
  { label: '繁體中文 (香港)', value: 'zh-HK' },
  { label: 'English', value: 'en-US' },
];
const selectedLocale = ref(locale.value);

const themeOptions = computed(() => [
  { label: t('theme.light'), value: 'light' },
  { label: t('theme.dark'), value: 'dark' },
  { label: t('theme.auto'), value: 'auto' },
]);

function changeTheme() {
  setThemeMode(themeMode.value);
}

function changeLocale() {
  locale.value = selectedLocale.value;
  localStorage.setItem('locale', selectedLocale.value);
}

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
    await message(t('noFileFound'), { title: t('invalidFileDir'), kind: 'error' });
    return;
  }

  const files = await Promise.all(
    resolveFiles.map(async (item) => {
      const name = await basename(item);
      return {
        name,
        path: item,
        status: ConvertStatus.wait,
        message: "",
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
.top-right{
  user-select: none;
  -webkit-user-select: none;
  position: fixed;
  top: 10px;
  right: 10px;
  left: 10px;
  z-index: 10;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}
.control{
  display: flex;
  align-items: center;
}
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