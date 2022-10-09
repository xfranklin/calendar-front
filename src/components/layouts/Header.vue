<template>
  <header>
    <img
      v-if="settings.isDarkMode"
      class="auth-layout__logo"
      src="/src/assets/images/logo-dark.svg?url"
      height="40"
      alt="oooi logo"
    />
    <img v-else class="auth-layout__logo" src="/src/assets/images/logo.svg?url" height="40" alt="oooi logo" />
  </header>
</template>
<script setup>
import { useSettingsStore } from "@/store/settings";
const settings = useSettingsStore();
</script>
