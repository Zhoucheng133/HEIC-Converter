import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia';
import "./style/main.css";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from "@primeuix/themes";
import 'primeicons/primeicons.css'

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

const app = createApp(App);

app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset
  }
});

app.mount('#app')