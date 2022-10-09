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
  try {
    const src = settings.isDarkMode ? `${props.src}-dark.${props.type}` : `${props.src}.${props.type}`;
    console.log(src);
    console.log(new URL(src, import.meta.url));
    return new URL(src, import.meta.url);
  } catch (e) {
    console.log(e);
  }
  return "";
});
</script>
