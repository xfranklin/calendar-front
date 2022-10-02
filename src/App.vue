<template>
  <component :is="layout" v-if="isInited">
    <router-view />
  </component>
  <div v-else>loading</div>
  <div class="color-mode">
    <button class="base-primary-outlined-button" @click="logout">logout</button>
    <ColorMode v-if="colorMode" />
  </div>
</template>
<script setup>
import { ref, watch, markRaw, computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "@/store/settings";
import { useServices } from "@/composables/useServices";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ColorMode from "@/components/ui/ColorMode.vue";

const layout = ref();
const route = useRoute();
const $services = useServices();
const settings = useSettingsStore();

const isInited = computed(() => {
  return settings.isInited;
});

const colorMode = () => {
  const { host } = window.location;
  return host.includes("localhost") || host.includes("dev");
};

const logout = () => {
  $services.auth.logout();
};

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
  display: flex;
  flex-direction: column;
  position: fixed !important;
  right: 44px;
  top: 0.5rem;
  z-index: 90;
}
</style>
