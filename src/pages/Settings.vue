<template>
  <h1 class="headline-2 settings__title">{{ $t("SETTINGS") }}</h1>
  <h2 class="subtitle-1 settings__subtitle">{{ $t("PERSONAL_DETAILS") }}</h2>
  <BaseForm v-slot="{ valid }" class="settings__form">
    <div class="settings__personal">
      <BaseInput class="settings__input" label="NAME_LABEL" placeholder="NAME_PLACEHOLDER" />
      <BaseInput class="settings__input" label="SURNAME_LABEL" placeholder="SURNAME_PLACEHOLDER" />
    </div>
    <BirthPicker class="settings__input" model-value="" />
    <button :disabled="!valid" type="submit" class="base-primary-button settings__update-button">
      {{ $t("UPDATE_PERSONAL_DETAILS") }}
    </button>
  </BaseForm>
  <h2 class="subtitle-1 settings__subtitle">{{ $t("AUTH_CHANNELS") }}</h2>
  <div class="settings__auth-channels">
    <BaseInput :model-value="user.userInfo.email" class="settings__input" label="EMAIL" :readonly="true" />
    <div class="settings__socials">
      <div class="base-text settings__socials-title">{{ $t("SOCIALS") }}</div>
      <div class="settings__socials-buttons">
        <button class="base-primary-outlined-button only-icon">
          <BaseIcon name="google" group="socials" />
        </button>
        <button class="base-primary-outlined-button only-icon" disabled>
          <BaseIcon name="facebook" group="socials" />
        </button>
      </div>
    </div>
  </div>
  <h2 v-if="!breakpoints.tablet" class="subtitle-1 settings__subtitle">{{ $t("APPEARANCE") }}</h2>
  <ColorMode v-if="!breakpoints.tablet" class="settings__color-switch" :label="$t('DARK_MODE')" />
</template>
<script setup>
import BirthPicker from "@/components/ui/BirthPicker.vue";
import ColorMode from "@/components/ui/ColorMode.vue";
import { useBreakPoints } from "@/composables/useBreakPoints";
import { useUserStore } from "@/store/user";

const breakpoints = useBreakPoints();
const user = useUserStore();
</script>
<style lang="scss">
.settings {
  &__title {
    padding: 24px 16px;
    color: var(--base-text-5);
  }
  &__subtitle {
    padding: 0 16px 16px 16px;
    color: var(--base-text-5);
  }
  &__form,
  &__color-switch {
    padding: 0 16px 40px 16px;
  }
  &__color-switch .base-switch__label {
    color: var(--base-text-5) !important;
  }
  &__update-button {
    width: 100%;
    margin-top: 16px;
  }
  &__auth-channels {
    padding: 0 16px 40px 16px;
  }
  &__socials-title {
    color: var(--base-text-5) !important;
    margin-bottom: 2px;
  }
  &__socials-buttons {
    display: flex;
    gap: 16px;
  }
}

@media screen and(min-width: 769px) {
  .settings {
    &__title {
      padding: 24px 24px 40px 24px;
    }
    &__subtitle {
      padding: 0 24px 16px 24px;
    }
    &__form,
    &__auth-channels {
      padding: 0 24px 40px 24px;
    }
    &__input,
    &__update-button {
      width: 416px !important;
    }
    &__personal,
    &__auth-channels {
      display: flex;
      gap: 24px;
    }
  }
}
</style>
