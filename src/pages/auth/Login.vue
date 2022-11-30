<template>
  <h1 class="subtitle-1">{{ $t("SIGN_IN_INTO") }}</h1>
  <div class="base-text sign-in__description">
    {{ $t("DONT_HAVE_ACCOUNT") }}
    <router-link class="base-link" :to="{ name: 'SignUp' }">{{ $t("CREATE_ACCOUNT") }}</router-link>
  </div>
  <BaseForm v-slot="{ valid }" class="sign-in__form" @submit="signIn">
    <BaseInput v-model="signInForm.email" :rules="emailHints" placeholder="EMAIL_PLACEHOLDER" label="EMAIL" />
    <BaseInput
      v-model="signInForm.password"
      :rules="passwordHints"
      type="password"
      placeholder="PASSWORD_ENTER_PLACEHOLDER"
      label="PASSWORD"
    />
    <button
      v-loading="isLoadingButton"
      :disabled="!valid"
      type="submit"
      class="base-primary-button w-100 sign-in__form-button"
    >
      {{ $t("SIGN_IN") }}
    </button>
  </BaseForm>
  <div class="sign-in__forgot">
    <router-link class="base-link" :to="{ name: 'Forgot' }">{{ $t("FORGOT_PASSWORD") }}</router-link>
  </div>
  <hr class="sign-in__divider" />
  <div class="base-text">{{ $t("SIGN_IN_SOCIALS") }}:</div>
  <div class="sign-in__socials">
    <button v-loading="isLoadingFacebook" class="base-primary-outlined-button only-icon" @click="facebookSignIn">
      <BaseIcon name="facebook" group="socials" />
    </button>
    <button v-loading="isLoadingGoogle" class="base-primary-outlined-button only-icon" @click="googleSignIn">
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

const signInForm = ref({ email: "", password: "" });

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

const signIn = async () => {
  if (isLoadingButton.value) return;
  isLoadingButton.value = true;
  const token = await reCaptchaExecute();
  await $service.auth.signIn({ ...signInForm.value, token });
  isLoadingButton.value = false;
};

const googleSignIn = async () => {
  if (isLoadingGoogle.value) return;
  isLoadingGoogle.value = true;
  const { url } = await $service.auth.getGoogleUrl();
  if (url) {
    window.location = url;
  }
  isLoadingGoogle.value = false;
};

const facebookSignIn = async () => {
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
.sign-in {
  &__description {
    margin-top: 16px;
  }
  &__form {
    margin-top: 40px;
  }
  &__form-button {
    margin-top: 16px;
  }
  &__forgot {
    margin-top: 24px;
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
