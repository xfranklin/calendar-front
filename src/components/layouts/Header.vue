<template>
  <header class="header">
    <button class="header__burger">
      <BaseIcon name="menu" />
    </button>
    <router-link class="header__logo" :to="{ name: 'Timeline' }">
      <BaseImage src="/src/assets/images/logo" alt="oooi logo" :height="40" />
    </router-link>
    <button class="header__search base-primary-outlined-button icon">
      <BaseIcon name="search" />
      {{ $t("SEARCH") }}
    </button>
  </header>
</template>
<script setup></script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 16px;

  &__logo {
    margin: 0 auto;
  }

  &__burger {
    cursor: pointer;
    background-color: unset;
    padding: 0;
    border: none;
  }
}
</style>
