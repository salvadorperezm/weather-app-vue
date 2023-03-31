import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/weather-app-vue/", // the name of your repository
  plugins: [vue()],
});