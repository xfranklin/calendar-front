<template>
    <BaseSwitch :model-value="darkMode" :label="label" @update:model-value="changeMode" />
</template>
<script setup>
import { computed } from "vue";
import { useSettingsStore } from "@/store/settings";
import { setColorMode } from "@/utils/settings-services.js";
defineProps({
  label: {
    type: String,
    required: false,
  }
});
const settings = useSettingsStore();
const darkMode = computed(() => settings.isDarkMode);


const changeMode = async (value) => {
  disableTransitions();
  darkMode.value = value;
  value ? setColorMode("DARK") : setColorMode("LIGHT");
  await new Promise((res) => {
    setTimeout(() => {
      res();
    }, 50);
  });
  enableTransitions();
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
const enableTransitions = () => {
  const css = document.getElementById("off-transition");
  css && css.remove()
};
</script>
