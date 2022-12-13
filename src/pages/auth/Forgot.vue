<template>
  <h1 class="subtitle-1">{{ $t("FORGOT_PASSWORD") }}</h1>
  <div v-if="!isResendButton" class="base-text forgot__description">
    {{ $t("REFRESH_PASSWORD") }}
    <router-link class="base-link" :to="{ name: 'Login' }">{{ $t("BACK_TO_SIGN_IN") }}</router-link>
  </div>
  <div v-else class="base-text forgot__description">
    {{ $t("DOUBLE_CHECK_YOUR_MAIL") }}
  </div>
  <BaseForm v-slot="{ valid }" class="forgot__form" @submit="forgot">
    <template v-if="!isResendButton">
      <BaseInput v-model="email" :rules="emailHints" placeholder="EMAIL_PLACEHOLDER" label="EMAIL" />
      <button
        v-loading="isLoadingButton"
        :disabled="!valid"
        type="submit"
        class="base-primary-button w-100 forgot__form-button"
      >
        {{ $t("SENT_RESET_PASSWORD_LINK") }}
      </button>
    </template>
    <template v-else>
      <button class="base-primary-button w-100 forgot__form-button" @click="isResendButton = false">
        {{ $t("CHANGE_EMAIL") }}
      </button>
      <button
        v-loading="isLoadingButton"
        class="base-primary-outlined-button w-100 forgot__form-button-resend"
        :disabled="isDisabled"
        type="submit"
      >
        {{ resendButton }}
      </button>
    </template>
  </BaseForm>
</template>
<script setup>
import { ref, onUnmounted, computed } from "vue";
import { useRecaptcha } from "@/composables/useRecaptcha";
import { useI18n } from "vue-i18n";
import { useServices } from "@/composables/useServices";
import { EMAIL_REG_EXP } from "@/utils/regular-expresions";

const { reCaptchaExecute } = useRecaptcha();
const { t } = useI18n();
const $service = useServices();

const isLoadingButton = ref(false);

const email = ref("");

const isResendButton = ref(false);

let startTime = ref(0);

let interval = null;

const isDisabled = computed(() => startTime.value);
const resendButton = computed(() => {
  return startTime.value ? t("RESEND_RESET_PASSWORD_LINK_IN") + startTime.value : t("RESEND_RESET_PASSWORD_LINK");
});

const emailHints = [
  (value) => !value && t("EMAIL_REQUIRED"),
  (value) => !new RegExp(EMAIL_REG_EXP).test(value) && t("EMAIL_INVALID")
];

const startTimer = () => {
  interval = setInterval(() => {
    startTime.value--;

    if (startTime.value === 0) {
      clearInterval(interval);
    }
  }, 1000);
};

const forgot = async () => {
  if (isLoadingButton.value) return;
  isLoadingButton.value = true;
  const token = await reCaptchaExecute();
  const response = await $service.auth.forgotPassword({ email: email.value, token });
  isLoadingButton.value = false;

  if (response) {
    isResendButton.value = true;
    clearInterval(interval);
    startTime.value = 30;
    startTimer();
  }
};

onUnmounted(() => {
  clearInterval(interval);
});
</script>
<style lang="scss" scoped>
.subtitle-1 {
  color: var(--base-text-14);
}
.forgot {
  &__description {
    margin-top: 16px;
  }
  &__form {
    margin-top: 40px;
  }
  &__form-button {
    margin-top: 20px;
    &-resend {
      margin-top: 24px;
    }
  }
}
</style>
