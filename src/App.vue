<template>
  <component :is="layout" v-if="isInited">
    <router-view />
  </component>
  <Loader v-else />
  <div id="modals-portal"></div>
</template>
<script setup>
import { ref, watch, markRaw, computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "@/store/settings";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
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
      layout.value = markRaw(component || EmptyLayout);
    } catch (e) {
      layout.value = markRaw(EmptyLayout);
    }
  },
  { immediate: true }
);
</script>
