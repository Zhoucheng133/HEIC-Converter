import { ref } from "vue";

export type ThemeMode = "light" | "dark" | "auto";

const THEME_KEY = "theme";

const saved = localStorage.getItem(THEME_KEY);
export const themeMode = ref<ThemeMode>(saved === "light" || saved === "dark" ? saved : "auto");

const mql = window.matchMedia("(prefers-color-scheme: dark)");

export function applyTheme(): void {
  const isDark =
    themeMode.value === "dark" || (themeMode.value === "auto" && mql.matches);
  document.documentElement.classList.toggle("dark", isDark);
}

export function setThemeMode(mode: ThemeMode): void {
  themeMode.value = mode;
  localStorage.setItem(THEME_KEY, mode);
  applyTheme();
}

export function initTheme(): void {
  mql.addEventListener("change", () => {
    if (themeMode.value === "auto") {
      applyTheme();
    }
  });
  applyTheme();
}