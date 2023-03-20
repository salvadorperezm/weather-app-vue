import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import {
  faTemperatureHigh,
  faSliders,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import BaseButton from "./components/BaseButton.vue";
import ForecastPage from "./pages/ForecastPage.vue";
import SettingsPage from "./pages/SettingsPage.vue";
import SelectLocation from "./pages/SelectLocation.vue";
import WeatherPage from "./pages/WeatherPage.vue";
import "./style.css";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: SelectLocation,
    },
    {
      path: "/weather",
      component: WeatherPage,
      beforeEnter: () => {
        const info = localStorage.getItem("weather-app-data");
        if (!info) {
          return "/";
        }
      },
    },
    {
      path: "/forecast",
      component: ForecastPage,
      beforeEnter: () => {
        const info = localStorage.getItem("weather-app-data");
        if (!info) {
          return "/";
        }
      },
    },
    {
      path: "/settings",
      component: SettingsPage,
      beforeEnter: () => {
        const info = localStorage.getItem("weather-app-data");
        if (!info) {
          return "/";
        }
      },
    },
  ],
});

library.add(faSun, faSliders, faTemperatureHigh, faMagnifyingGlass);

app.component("base-button", BaseButton);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
