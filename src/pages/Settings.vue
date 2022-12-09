<template>
  <h1 class="headline-2 settings__title">{{ $t("SETTINGS") }}</h1>
  <h2 v-if="!breakpoints.tablet" class="subtitle-1 settings__subtitle">{{ $t("APPEARANCE") }}</h2>
  <ColorMode v-if="!breakpoints.tablet" class="settings__color-switch" :label="$t('DARK_MODE')" />
  <h2 class="subtitle-1 settings__subtitle">{{ $t("PERSONAL_DETAILS") }}</h2>
  <BaseForm v-slot="{ valid }" class="settings__form" @submit="updatePersonDetails">
    <div class="settings__personal">
      <BaseInput
        v-model="personalForm.firstName"
        :rules="rules"
        class="settings__input"
        label="NAME_LABEL"
        placeholder="NAME_PLACEHOLDER"
      />
      <BaseInput
        v-model="personalForm.lastName"
        :rules="rules"
        class="settings__input"
        label="SURNAME_LABEL"
        placeholder="SURNAME_PLACEHOLDER"
      />
    </div>
    <BirthPicker v-model="personalForm.birthday" class="settings__input" />
    <button
      v-loading="personalDataLoading"
      :disabled="!valid || !hasChanges"
      type="submit"
      class="base-primary-button settings__update-button"
    >
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
  <!--  TODO ask Dasha redesign-->
  <div class="settings__account-manage">
    <button
      class="base-primary-outlined-button icon settings__change-password"
      @click="$router.push({ name: 'ChangePassword' })"
    >
      <BaseIcon name="settings" />
      {{ $t("CHANGE_PASSWORD") }}
    </button>
    <button class="base-primary-outlined-button icon settings__confirm-button">
      <BaseIcon name="mail" />{{ $t("SEND_CONFIRM_LETTER") }}
    </button>
    <DeleteAccountModal />
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import BirthPicker from "@/components/ui/BirthPicker.vue";
import ColorMode from "@/components/ui/ColorMode.vue";
import DeleteAccountModal from "@/components/modals/DeleteAccountModal.vue";
import { useBreakPoints } from "@/composables/useBreakPoints";
import { useUserStore } from "@/store/user";
import { useServices } from "@/composables/useServices";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const breakpoints = useBreakPoints();
const user = useUserStore();
const $services = useServices();

const personalDataLoading = ref(false);

const personalForm = ref({
  firstName: user.getUserInfo?.firstName || "",
  lastName: user.getUserInfo?.lastName || "",
  birthday: user.getUserInfo?.birthday || ""
});

const rules = [
  (value) => !value && t("ERROR_REQUIRED"),
  (value) => value.length > 128 && t("MAX_CHARS", { number: 128 })
];

const hasChanges = computed(() => {
  const { firstName, lastName, birthday } = user.getUserInfo;
  return Boolean(
    personalForm.value.firstName !== firstName ||
      personalForm.value.lastName !== lastName ||
      personalForm.value.birthday !== birthday
  );
});

const updatePersonDetails = async () => {
  if (personalDataLoading.value) return;
  personalDataLoading.value = true;
  await $services.user.updatePersonalDetails({ ...personalForm.value });
  personalDataLoading.value = false;
};
</script>
<style lang="scss">
.settings {
  &__title {
    padding: 24px 16px;
  }
  &__subtitle {
    padding: 0 16px 16px 16px;
  }
  &__form,
  &__color-switch {
    padding: 0 16px 40px 16px;
  }
  &__update-button {
    width: 100%;
    margin-top: 16px;
  }
  &__auth-channels {
    padding: 0 16px 40px;
  }
  &__socials-title {
    color: var(--base-text) !important;
    margin-bottom: 2px;
  }
  &__socials-buttons {
    display: flex;
    gap: 16px;
  }
  &__account-manage {
    padding: 0 16px 40px;
  }
  &__change-password {
    margin-bottom: 8px;
  }
  &__confirm-button {
    margin-bottom: 24px;
  }
}

@media screen and(min-width: 769px) {
  .settings {
    &__title {
      padding: 24px 24px 40px;
    }
    &__subtitle {
      padding: 0 24px 16px;
    }
    &__form {
      padding: 0 24px 40px;
    }
    &__auth-channels {
      padding: 0 24px 16px;
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
    &__account-manage {
      padding: 0 24px 40px;
    }
    &__confirm-button {
      margin-bottom: 40px;
    }
  }
}
</style>
