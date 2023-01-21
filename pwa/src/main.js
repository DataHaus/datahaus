import { createApp } from "vue";
import { createPinia } from "pinia";
import { isRunningOnPWA } from "./services/helpers";

import App from "./App.vue";
import router from "./router";

import "./assets/styles/styles.scss";
import "notyf/notyf.min.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router);

if (isRunningOnPWA()) window.resizeTo(985, 677);

app.mount("#app");
