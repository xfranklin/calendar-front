<template>
  <component :is="layout" v-if="isInited">
    <router-view />
  </component>
  <div v-else>loading</div>
  <Color-Mode v-if="colorMode" class="color-mode" />
</template>
<script setup>
import { ref, watch, markRaw, computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "@/store/settings";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ColorMode from "@/components/ui/ColorMode.vue";

const layout = ref();
const route = useRoute();
const settings = useSettingsStore();

const isInited = computed(() => {
  return settings.isInited;
});

const colorMode = computed(()=>{
  const { host } = window.location;
  return host.includes("localhost") || host.includes("dev");
})

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
<style lang="scss">
@import "./assets/scss";
.color-mode {
  position: fixed !important;
  right: 44px;
  top: 0.5rem;
  z-index: 90;
}
</style>
