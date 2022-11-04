<template>
  <BaseSwitch id="color-switch" :model-value="settings.isDarkMode" :label="label" @update:model-value="changeMode" />
</template>
<script setup>
import { useSettingsStore } from "@/store/settings";
import { useServices } from "@/composables/useServices";

defineProps({
  label: {
    type: String,
    required: false
  }
});

const settings = useSettingsStore();
const $services = useServices();

const changeMode = async (value) => {
  disableTransitions();
  value ? $services.settings.setColorMode("DARK") : $services.settings.setColorMode("LIGHT");
  await new Promise((res) => {
    setTimeout(() => {
      res();
    }, 50);
  });
  enableTransitions();
};

const enableTransitions = () => {
  const css = document.getElementById("off-transition");
  css && css.remove();
};

const disableTransitions = () => {
  const css = document.createElement("style");
  css.setAttribute("id", "off-transition");
  css.appendChild(
    document.createTextNode(
      `* {
       -webkit-transition: none !important;
       -moz-transition: none !important;
       -o-transition: none !important;
       -ms-transition: none !important;
       transition: none !important;
      }`
    )
  );
  document.head.appendChild(css);
};
</script>
<style>
#color-switch .base-switch__core {
  transition: all 250ms ease-in-out !important;
  transition-property: transform, background-position, outline-color !important;
}

#color-switch .base-switch__dot {
  transition: all ease-in-out 200ms !important;
}
</style>
