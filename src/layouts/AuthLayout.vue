<template>
  <div class="auth-layout">
    <div class="auth-layout__background"></div>
    <div class="auth-layout__content">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss">
.auth-layout {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__background {
    flex-grow: 1;
    height: 140px;
    background-image: linear-gradient(132.6deg, rgba(71, 139, 214, 1) 23.3%, rgba(37, 216, 211, 1) 84.7%);
  }

  &__content {
    padding: 40px 16px 16px;
  }
}

@media screen and (min-width: 769px) {
  .auth-layout {
    flex-direction: row;

    &__background {
      height: 140px;
    }

    &__content {
      width: max(360px, 35%);
      padding: 200px 24px 24px;
    }
  }
}
</style>
