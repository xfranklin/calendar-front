<template>
  <img :src="imageSrc" :alt="alt" />
</template>

<script setup>
import { computed } from "vue";
import { useSettingsStore } from "@/store/settings";

const props = defineProps({
  type: {
    type: String,
    default: "png"
  },
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String
  }
});

const settings = useSettingsStore();
const imageSrc = computed(() => {
  // TODO make more optimal
  // SVG not work correctly
  const src = settings.isDarkMode ? `${props.src}-dark.${props.type}` : `${props.src}.${props.type}`;
  const modules = import.meta.globEager("/src/assets/images/**/*");
  return modules[src].default;
});
</script>
