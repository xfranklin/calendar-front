<template>
  <aside :class="['main-sidebar', { opened: settings.isSidebarOpened }]">
    <div class="main-sidebar__header">
      <router-link :to="{ name: 'UiKit' }">
        <BaseImage src="/src/assets/images/logo" alt="oooi-logo" :height="40" />
      </router-link>
      <button class="main-sidebar__header-close clear-button" @click="close">
        <BaseIcon name="close" />
      </button>
    </div>
  </aside>
  <div v-if="settings.isSidebarOpened" class="main-sidebar__bg-layout" @click="close"></div>
</template>
<script setup>
import { onUnmounted } from "vue";
import { useSettingsStore } from "@/store/settings";
import { useBreakPoints } from "@/composables/useBreakPoints";

const settings = useSettingsStore();
const breakpoints = useBreakPoints();

const close = () => {
  settings.setSideBarStatus(false);
};

onUnmounted(() => {
  console.log(breakpoints);
  close();
});
</script>
<style lang="scss">
.main-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  max-width: 480px;
  width: 100%;
  height: 100%;
  z-index: 900;
  background-color: var(--base-page-bg);
  transform: translateX(-100%);
  transition: transform 300ms ease-in-out;

  &.opened {
    transform: translateX(0);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 16px;
  }

  &__bg-layout {
    position: fixed;
    z-index: 800;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;
  }
}

@media screen and (min-width: 481px) {
  .sidebar {
    max-width: 375px;
    border-radius: 0 16px 16px 0;
    &__header {
    }
  }
}
</style>
