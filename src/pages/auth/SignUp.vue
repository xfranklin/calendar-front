<template>
  <h1 class="subtitle-1">{{ $t("SIGN_UP_INTO") }}</h1>
  <div class="base-text sign-up__description">
    {{ $t("ALREADY_HAVE_ACCOUNT") }}
    <router-link class="base-link" :to="{ name: 'Login' }">{{ $t("SIGN_IN") }}</router-link>
  </div>
  <BaseForm v-slot="{ valid }" class="sign-up__form" @submit="signUp">
    <BaseInput v-model="signUpForm.email" :rules="emailHints" placeholder="EMAIL_PLACEHOLDER" label="EMAIL" />
    <BaseInput
      v-model="signUpForm.password"
      :rules="passwordHints"
      type="password"
      placeholder="PASSWORD_CREATE_PLACEHOLDER"
      label="PASSWORD"
    />
    <button
      v-loading="isLoadingButton"
      :disabled="!valid"
      type="submit"
      class="base-primary-button w-100 sign-up__form-button"
    >
      {{ $t("SIGN_UP") }}
    </button>
  </BaseForm>
  <hr class="sign-up__divider" />
  <div class="base-text">{{ $t("SIGN_UP_SOCIALS") }}:</div>
  <div class="sign-up__socials">
    <button v-loading="isLoadingFacebook" class="base-primary-outlined-button only-icon" @click="facebookSignUp">
      <BaseIcon name="facebook" group="socials" />
    </button>
    <button v-loading="isLoadingGoogle" class="base-primary-outlined-button only-icon" @click="googleSignUp">
      <BaseIcon name="google" group="socials" />
    </button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRecaptcha } from "@/composables/useRecaptcha";
import { useI18n } from "vue-i18n";
import { useServices } from "@/composables/useServices";
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "@/utils/regular-expresions";

const { reCaptchaExecute } = useRecaptcha();
const { t } = useI18n();
const $service = useServices();

const isLoadingButton = ref(false);
const isLoadingFacebook = ref(false);
const isLoadingGoogle = ref(false);

const signUpForm = ref({ email: "", password: "" });

const emailHints = [
  (value) => !value && t("EMAIL_REQUIRED"),
  (value) => !new RegExp(EMAIL_REG_EXP).test(value) && t("EMAIL_INVALID")
];

const passwordHints = [
  (value) => !value && t("PASSWORD_REQUIRED"),
  (value) => !PASSWORD_REG_EXP.test(value) && t("PASSWORD_INVALID"),
  (value) => value.length < 4 && t("MIN_CHARS", { number: 4 }),
  (value) => value.length > 128 && t("MAX_CHARS", { number: 128 })
];

const signUp = async () => {
  if (isLoadingButton.value) return;
  isLoadingButton.value = true;
  const token = await reCaptchaExecute();
  const signUpData = {
    email: signUpForm.value.email,
    password: signUpForm.value.password,
    token: token
  };
  await $service.auth.signUp(signUpData);
  isLoadingButton.value = false;
};

const googleSignUp = async () => {
  if (isLoadingGoogle.value) return;
  isLoadingGoogle.value = true;
  const { url } = await $service.auth.getGoogleUrl();
  if (url) {
    window.location = url;
  }
  isLoadingGoogle.value = false;
};

const facebookSignUp = async () => {
  if (isLoadingFacebook.value) return;
  isLoadingFacebook.value = true;
  const { url } = await $service.auth.getFacebookUrl();
  if (url) {
    window.location = url;
  }
  isLoadingFacebook.value = false;
};
</script>
<style lang="scss" scoped>
.subtitle-1 {
  color: var(--base-text-14);
}
.sign-up {
  &__description {
    margin-top: 16px;
  }
  &__form {
    margin-top: 40px;
  }
  &__form-button {
    margin-top: 16px;
  }
  &__divider {
    margin: 40px 0;
  }
  &__socials {
    display: flex;
    margin-top: 8px;

    button {
      margin-right: 1rem;
    }
  }
}
</style>
