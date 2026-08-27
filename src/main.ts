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
import { initTheme } from "./theme";
import zhCN from "./locales/zh-CN.json";
import zhTW from "./locales/zh-TW.json";
import zhHK from "./locales/zh-HK.json";
import enUS from "./locales/en-US.json";

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
const savedLang = localStorage.getItem('locale');
const userLang = savedLang || navigator.language;

const i18n=createI18n({
  legacy: false,
  locale: userLang,
  fallbackLocale: 'en-US',
  messages: {
    "zh-CN": zhCN,
    "zh-TW": zhTW,
    "zh-HK": zhHK,
    "en-US": enUS,
  }
})

const app = createApp(App);

app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.dark',
    }
  }
});
app.use(i18n);
initTheme();
app.mount('#app');