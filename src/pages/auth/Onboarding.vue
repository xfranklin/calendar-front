<template>
  <h1 class="subtitle-1">{{ $t("PERSONAL_DETAILS") }}</h1>
  <BaseForm v-slot="{ valid }" class="onboarding__form" @submit="onboard">
    <div class="onboarding__personal">
      <BaseInput v-model="formData.firstName" :rules="rules" label="NAME_LABEL" placeholder="NAME_PLACEHOLDER" />
      <BaseInput v-model="formData.lastName" :rules="rules" label="SURNAME_LABEL" placeholder="SURNAME_PLACEHOLDER" />
    </div>
    <h2 class="subtitle-2">{{ $t("DATE_OF_BIRTH") }}</h2>
    <div class="onboarding__birthday-description small-text">{{ $t("DATE_ASK_REASON") }}</div>
    <BirthPicker v-model="formData.birthday" />
    <button
      v-loading="isLoading"
      :disabled="!formData.birthday || !valid"
      type="submit"
      class="base-primary-button w-100"
    >
      {{ $t("CONFIRM_PERSONAL_DETAILS") }}
    </button>
  </BaseForm>
</template>
<script setup>
import { ref } from "vue";
import BirthPicker from "@/components/ui/BirthPicker.vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/store/user";
import { useServices } from "@/composables/useServices";

const $services = useServices();
const { t } = useI18n();

const isLoading = ref(false);

const rules = [
  (value) => !value && t("ERROR_REQUIRED"),
  (value) => value.length > 128 && t("MAX_CHARS", { number: 128 })
];
const user = useUserStore();

const formData = ref({
  firstName: user.getUserInfo?.firstName || "",
  lastName: user.getUserInfo?.lastName || "",
  birthday: user.getUserInfo?.birthday || ""
});

const onboard = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  await $services.user.onboarding(formData.value);
  isLoading.value = false;
};
</script>
<style lang="scss" scoped>
.subtitle-1,
.subtitle-2 {
  color: var(--base-text-14);
}

.onboarding {
  &__form {
    margin-top: 40px;
  }
  &__personal {
    display: flex;
    gap: 24px;
  }
  &__birthday-description {
    margin-top: 4px;
  }
}

.birth-picker {
  margin: 8px 0 20px;

  ::v-deep(.birth-picker__year),
  ::v-deep(.birth-picker__day) {
    flex: 1 0 64px;
  }
}

@media screen and (min-width: 1200px) {
  .birth-picker {
    ::v-deep(.birth-picker__year),
    ::v-deep(.birth-picker__day) {
      flex: auto;
    }
  }
}
</style>
