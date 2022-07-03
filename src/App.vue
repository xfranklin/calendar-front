<template>
  <component :is="layout" v-if="isInited">
    <router-view />
  </component>
  <div v-else>loading</div>
</template>
<script setup>
import { ref, watch, markRaw, computed } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "@/store/settings";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const layout = ref();
const route = useRoute();
const settings = useSettingsStore();

const isInited = computed(() => {
  return settings.isInited;
});

watch(
  () => route.meta?.layout,
  async (metaLayout) => {
    try {
      const component = metaLayout && (await import(`./layouts/${metaLayout}.vue`));
      layout.value = markRaw(component?.default || DefaultLayout);
    } catch (e) {
      layout.value = markRaw(DefaultLayout);
    }
  },
  { immediate: true }
);
</script>
<style lang="scss">
@import "./assets/scss";
</style>
