<template>
  <header class="main-header">
    <button class="main-header__burger clear-button" @click="openSidebar"><BaseIcon name="menu" /></button>
    <router-link class="main-header__logo clear-button" :to="{ name: 'Timeline' }">
      <BaseImage src="/src/assets/images/logo" alt="oooi logo" :height="40" />
    </router-link>
    <ColorMode v-if="breakpoints.tablet" class="main-header__color-mode" :label="$t('DARK_MODE')" />
    <button class="main-header__search small-text clear-button">
      <BaseIcon name="search" />
      {{ $t("SEARCH") }}
    </button>
  </header>
</template>
<script setup>
import { useSettingsStore } from "@/store/settings";
import { useBreakPoints } from "@/composables/useBreakPoints";
import ColorMode from "@/components/ui/ColorMode.vue";
const settings = useSettingsStore();
const breakpoints = useBreakPoints();

const openSidebar = () => {
  const body = document.getElementById("oooi-app");
  body.style.overflowY = "hidden";
  body && settings.setSideBarStatus(true);
};
</script>
<style lang="scss">
.main-header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;

  &__logo {
    display: flex;
    margin: 0 auto;
  }

  &__search {
    display: flex;
    align-items: center;
    color: var(--base-text-15);

    .base-icon {
      margin-right: 2px;
    }
  }
}

@media screen and (min-width: 769px) {
  .main-header {
    &__logo {
      margin: 0 18px 0 20px;
    }

    &__color-mode {
      margin-right: auto;
    }
  }
}
</style>
