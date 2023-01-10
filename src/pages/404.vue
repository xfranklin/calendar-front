<template>
  <div class="not-found">
    <div class="not-found__content">
      <h1 class="headline-1 not-found__content-title">404</h1>
      <div>{{ $t("404_MESSAGE") }}</div>
      <router-link v-if="user.isAuthenticated" class="base-link icon" :to="{ name: 'Timeline' }">{{
        $t("GO_TO_TIMELINE")
      }}</router-link>
      <router-link v-else class="base-link icon" :to="{ name: 'Login' }">{{ $t("GO_TO_SIGN_IN") }}</router-link>
    </div>
    <div class="not-found__background"></div>
  </div>
</template>
<script setup>
import { useUserStore } from "@/store/user";
const user = useUserStore();
</script>

<style lang="scss" scoped>
.not-found {
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  padding-top: 32px;

  &__background {
    flex-grow: 1;
    margin: 0 auto 0 auto;
    max-width: 343px;
    width: 100%;
    height: 269px;
    background-image: url("../assets/images/not-found/404-bg.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  &__content {
    padding: 40px 16px 16px;
    &-title {
      margin-bottom: 24px;
    }
  }
}

@media screen and (min-width: 769px) {
  .not-found {
    flex-direction: row;
    padding-top: 40px;

    &__background {
      height: 421px;
      max-width: 535px;
      width: 100%;
    }

    &__content {
      width: max(360px, 35%);
      padding: 0 24px 24px;
    }
  }
}
[dark] {
  .not-found__background {
    background-image: url("../assets/images/not-found/404-bg-dark.png");
  }
}
</style>
