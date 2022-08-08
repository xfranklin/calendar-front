<template>
  <h1 class="subtitle-1">{{ $t("SIGN_UP_INTO") }}</h1>
  <div class="base-text sign-up__description">
    {{ $t("ALREADY_HAVE_ACCOUNT") }}
    <router-link class="base-link" :to="{ name: 'UiKit' }">{{ $t("SIGN_IN") }}</router-link>
  </div>
  <BaseForm ref="formRef" class="sign-up__form" @submit="signUp">
    <BaseInput v-model="signUpForm.email" :rules="emailHints" placeholder="EMAIL_PLACEHOLDER" label="EMAIL" />
    <BaseInput
      v-model="signUpForm.password"
      :rules="passwordHints"
      type="password"
      placeholder="PASSWORD_CREATE_PLACEHOLDER"
      label="PASSWORD"
    />
    <button type="submit" class="base-primary-button w-100 sign-up__form-button">{{ $t("SIGN_UP") }}</button>
  </BaseForm>
  <hr class="sign-up__divider" />
  <div class="base-text">{{ $t("SIGN_UP_SOCIALS") }}:</div>
  <div class="sign-up__socials">
    <button class="base-primary-outlined-button only-icon"><BaseIcon name="facebook" group="socials" /></button>
    <button class="base-primary-outlined-button only-icon"><BaseIcon name="google" group="socials" /></button>
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
const formRef = ref(null);

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
  const isValid = formRef.value.validateForm();
  if (isValid) {
  }
  // const token = await reCaptchaExecute();
  // const signUpData = {
  //   email: signUpForm.value.email,
  //   password: signUpForm.value.password,
  //   token
  // };
  // await $service.auth.signUp(signUpData);
};
</script>
<style lang="scss" scoped>
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
