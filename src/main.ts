import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia';
import "./style/main.css";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from "@primeuix/themes";
import 'primeicons/primeicons.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { createI18n } from "vue-i18n";

const pinia = createPinia()
const color="cyan";

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: `{${color}.50}`,
      100: `{${color}.100}`,
      200: `{${color}.200}`,
      300: `{${color}.300}`,
      400: `{${color}.400}`,
      500: `{${color}.500}`,
      600: `{${color}.600}`,
      700: `{${color}.700}`,
      800: `{${color}.800}`,
      900: `{${color}.900}`,
      950: `{${color}.950}`
    }
  }
});
// const userLang = navigator.language;
const userLang = "en-US";

const i18n=createI18n({
  legacy: false,
  locale: userLang,
  fallbackLocale: 'en',
  messages: {
    "zh-CN": {
      "selectFile": "选择文件",
      "or": "或",
      "selectDir": "选择目录",
      "drop": "也可以拖拽文件/目录到这里",
      "githubLink": "本项目地址",
      "convert": "转换",
      "stop": "停止",
      "close": "关闭",
      "keepExif": "保留EXIF信息",
      "override": "覆盖已有文件",
      "taskInfo": "任务信息",
      "select": "选择",
      "waiting": "等待中",
      "finished": "已完成",
      "exist": "已存在",
      "err": "错误",
      "ok": "完成",
      "fileName": "文件名称",
      "filePath": "文件路径",
      "status": "当前状态",
      "outputInfo": "输出信息"
    },

    "zh-TW": {
      "selectFile": "選擇文件",
      "or": "或",
      "selectDir": "選擇目錄",
      "drop": "也可以拖曳文件/目錄到這裡",
      "githubLink": "本專案地址",
      "convert": "轉換",
      "stop": "停止",
      "close": "關閉",
      "keepExif": "保留EXIF資訊",
      "override": "覆蓋已有文件",
      "taskInfo": "任務資訊",
      "select": "選擇",
      "waiting": "等待中",
      "finished": "已完成",
      "exist": "已存在",
      "err": "錯誤",
      "ok": "完成",
      "fileName": "文件名稱",
      "filePath": "文件路徑",
      "status": "當前狀態",
      "outputInfo": "輸出資訊"
    },

    "zh-HK": {
      "selectFile": "選擇檔案",
      "or": "或",
      "selectDir": "選擇目錄",
      "drop": "亦可將檔案／目錄拖放到此處",
      "githubLink": "本項目地址",
      "convert": "轉換",
      "stop": "停止",
      "close": "關閉",
      "keepExif": "保留EXIF資訊",
      "override": "覆蓋已有檔案",
      "taskInfo": "任務資訊",
      "select": "選擇",
      "waiting": "等候中",
      "finished": "已完成",
      "exist": "已存在",
      "err": "錯誤",
      "ok": "完成",
      "fileName": "檔案名稱",
      "filePath": "檔案路徑",
      "status": "當前狀態",
      "outputInfo": "輸出資訊"
    },

    "en": {
      "selectFile": "Select File",
      "or": "or",
      "selectDir": "Select Directory",
      "drop": "You can also drag and drop files/directories here",
      "githubLink": "Project Repository",
      "convert": "Convert",
      "stop": "Stop",
      "close": "Close",
      "keepExif": "Keep EXIF",
      "override": "Overwrite",
      "taskInfo": "Task Information",
      "select": "Select",
      "waiting": "Waiting",
      "finished": "Finished",
      "exist": "Already Exists",
      "err": "Error",
      "ok": "Done",
      "fileName": "File Name",
      "filePath": "File Path",
      "status": "Current Status",
      "outputInfo": "Output"
    }
  }
})

const app = createApp(App);

app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset
  }
});
app.use(i18n);
app.mount('#app');