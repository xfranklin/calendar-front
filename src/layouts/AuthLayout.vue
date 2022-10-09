<template>
  <div class="auth-layout">
    <div class="auth-layout__background"></div>
    <div class="auth-layout__content">
      <img
        v-if="settings.isDarkMode"
        class="auth-layout__logo"
        src="/src/assets/images/logo-dark.svg?url"
        alt="oooi logo"
      />
      <img v-else class="auth-layout__logo" src="/src/assets/images/logo.svg?url" alt="oooi logo" />
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { useSettingsStore } from "@/store/settings";
const settings = useSettingsStore();
</script>
<style lang="scss">
.auth-layout {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__background {
    flex-grow: 1;
    height: 140px;
    background-image: url("../assets/images/layouts/auth-bg-mob.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  &__content {
    padding: 40px 16px 16px;
  }

  &__logo {
    margin-bottom: 40px;
  }
}

@media screen and (min-width: 769px) {
  .auth-layout {
    flex-direction: row;

    &__background {
      height: auto;
      min-height: 100vh;
      background-image: url("../assets/images/layouts/auth-bg.jpg");
    }

    &__content {
      width: max(360px, 35%);
      padding: 120px 24px 24px;
    }

    &__logo {
      margin-bottom: 80px;
    }
  }
}
[dark] {
  .auth-layout__background {
    background-image: url("../assets/images/layouts/auth-bg-mob-dark.jpg");
    @media screen and (min-width: 769px) {
      background-image: url("../assets/images/layouts/auth-bg-dark.jpg");
    }
  }
}
</style>
