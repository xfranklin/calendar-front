<template>
  <component :is="layout" v-if="isInited">
    <router-view />
  </component>
  <Loader v-else />
</template>
<script setup>
import { ref, watch, markRaw, computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "@/store/settings";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Loader from "@/components/layouts/Loader.vue";

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
      const component = metaLayout && defineAsyncComponent(() => import(`./layouts/${metaLayout}.vue`));
      layout.value = markRaw(component || DefaultLayout);
    } catch (e) {
      layout.value = markRaw(DefaultLayout);
    }
  },
  { immediate: true }
);
</script>
