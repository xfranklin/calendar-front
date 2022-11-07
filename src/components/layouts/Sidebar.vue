<template>
  <aside :class="['main-sidebar', { opened: settings.isSidebarOpened }]">
    <div class="main-sidebar__header">
      <router-link class="clear-button" :to="{ name: 'UiKit' }">
        <BaseImage src="/src/assets/images/logo" alt="oooi-logo" :height="40" />
      </router-link>
      <button class="main-sidebar__header-close clear-button" @click="close">
        <BaseIcon name="close" />
      </button>
    </div>
    <nav class="main-sidebar__menu">
      <router-link
        v-for="({ name, term, icon }, key) in navigationList"
        :key="key"
        :to="{ name }"
        class="main-sidebar__menu-link"
      >
        <BaseIcon :name="icon" />
        {{ $t(term) }}
      </router-link>
    </nav>
    <div class="main-sidebar__actions">
      <button
        v-for="({ action, term, icon }, key) in actionsList"
        :key="key"
        type="button"
        class="main-sidebar__actions-btn"
        @click="actions[action]()"
      >
        <BaseIcon :name="icon" />
        {{ $t(term) }}
      </button>
    </div>
  </aside>
  <div v-if="settings.isSidebarOpened" class="main-sidebar__bg-layout" @click="close"></div>
</template>
<script setup>
import { watch } from "vue";
import { useSettingsStore } from "@/store/settings";
import { useServices } from "@/composables/useServices";
import { useRoute } from "vue-router";

const settings = useSettingsStore();
const $services = useServices();
const route = useRoute();

const navigationList = [
  { name: "Timeline", term: "TIMELINE", icon: "clock" },
  { name: "Boards", term: "BOARDS", icon: "grid" },
  { name: "Archive", term: "ARCHIVE", icon: "archive" },
  { name: "Settings", term: "SETTINGS", icon: "settings" }
];

const actionsList = [
  { action: "onboarding", term: "ONBOARDING", icon: "gaming" },
  { action: "help", term: "HELP", icon: "help" },
  { action: "logout", term: "LOG_OUT", icon: "logout" }
];

watch(
  () => route.name,
  () => {
    close();
  }
);

const close = () => {
  const body = document.getElementById("oooi-app");
  body.style.overflowY = "unset";
  settings.setSideBarStatus(false);
};

const actions = {
  async logout() {
    await $services.auth.logout();
  }
};
</script>
<style lang="scss">
.main-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 900;
  background-color: var(--base-page-bg);
  overflow: auto;
  transform: translateX(-100%);
  transition: transform 300ms ease-in-out;
  padding-bottom: 16px;

  &.opened {
    transform: translateX(0);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 16px;
  }

  &__menu,
  &__actions {
    display: flex;
    flex-direction: column;
  }

  &__menu {
    margin-bottom: 40px;
  }

  &__actions {
    margin-top: auto;
  }

  &__menu-link,
  &__actions-btn {
    position: relative;
    display: flex;
    margin-bottom: 8px;
    padding: 8px 16px;
    font-size: 16px;
    line-height: 24px;
    color: var(--base-text-10);
    text-decoration: none;
    outline-color: transparent;
    transition: color, outline-color 150ms linear;

    &:last-of-type {
      margin-bottom: 0;
    }

    &:focus-visible {
      outline: 2px solid var(--base-bg-5);
      outline-offset: -2px;
    }

    .base-icon {
      width: 24px;
      height: 24px;
      margin-right: 8px;
      transition: transform 150ms linear;
    }

    &.router-link-active .base-icon,
    &:hover .base-icon {
      transform: scale(1.2);
    }
  }

  &__menu-link {
    &:before {
      position: absolute;
      content: "";
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      z-index: -1;
      background: radial-gradient(60% 23077.62% at 100% 100%, #a3c3d3 0.05%, transparent 100%),
        linear-gradient(0deg, #ffe369, #ffe369);
      transition: opacity 150ms linear;
    }

    &:hover,
    &.router-link-active {
      color: var(--color-blue-dark-medium);
      &:before {
        opacity: 1;
      }
    }
  }

  &__actions-btn {
    border: none;
    background-color: unset;
    cursor: pointer;
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
  .main-sidebar {
    max-width: 375px;
    border-radius: 0 16px 16px 0;
    &__header {
    }
  }
}
</style>
