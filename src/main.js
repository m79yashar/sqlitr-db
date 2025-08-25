// import './assets/main.css'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/app/sw.js", { scope: "/app/" })
      .then((reg) => console.log("SW registered with scope:", reg.scope))
      .catch((err) => console.error("SW registration failed:", err));
  });
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
