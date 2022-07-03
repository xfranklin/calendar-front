import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { i18n } from "./configs/i18n";
import { createPinia } from "pinia";
import { servicesPlugin } from "@/plugins/services";
import { initPlugin } from "@/plugins/init";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(servicesPlugin);
app.use(initPlugin);
app.mount("#calendar-app");
