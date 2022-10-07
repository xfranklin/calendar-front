import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { i18n } from "./configs/i18n";
import { createPinia } from "pinia";
import { servicesPlugin } from "@/plugins/services";
import { initPlugin } from "@/plugins/init";

import { vLoading } from "@/directives/vLoading";
import { vClickOutside } from "@/directives/vClickOutside";

import BaseForm from "@/components/base/form/BaseForm.vue";
import BaseInput from "@/components/base/form/BaseInput.vue";
import BaseSwitch from "@/components/base/form/BaseSwitch.vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import BaseImage from "@/components/base/BaseImage.vue";

const app = createApp(App);
app.use(i18n);
app.use(createPinia());
app.use(router);
app.use(servicesPlugin);
app.use(initPlugin);

app.component("BaseForm", BaseForm);
app.component("BaseInput", BaseInput);
app.component("BaseSwitch", BaseSwitch);
app.component("BaseIcon", BaseIcon);
app.component("BaseImage", BaseImage);

app.directive("loading", vLoading);
app.directive("click-outside", vClickOutside);

app.mount("#calendar-app");
