<template>
  <h1 class="headline-2 settings__title">{{ $t("SETTINGS") }}</h1>
  <h2 class="subtitle-1 settings__subtitle">{{ $t("PERSONAL_DETAILS") }}</h2>
  <BaseForm v-slot="{ valid }" class="settings__form">
    <div>
      <BaseInput label="NAME_LABEL" />
      <BaseInput label="SURNAME_LABEL" />
    </div>
    <BirthPicker model-value="" />
    <button :disabled="!valid" type="submit" class="base-primary-button settings__update-button">
      {{ $t("UPDATE_PERSONAL_DETAILS") }}
    </button>
  </BaseForm>
</template>
<script setup>
import BirthPicker from "@/components/ui/BirthPicker.vue";
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
  &__form {
    padding: 0 16px 40px 16px;
  }
  &__update-button {
    width: 100%;
    margin-top: 16px;
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
    &__form {
      padding: 0 24px 40px 24px;
    }
  }
}
</style>
