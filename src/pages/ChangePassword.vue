<template>
  <div class="change-password">
    <h2 class="headline-2 change-password__title">Change Password</h2>
    <router-link class="base-link icon change-password__link" :to="{ name: 'Settings' }">
      <BaseIcon name="chevron-left" group="chevrons" />{{ $t("BACK_TO_SETTINGS") }}</router-link
    >
    <BaseForm v-slot="{ valid }" class="change-password__form" @submit="Change">
      <BaseInput
        v-model="ChangePassword.oldPassword"
        :rules="passwordHints.current"
        class="changer-password_input"
        type="password"
        placeholder="PASSWORD_CREATE_PLACEHOLDER"
        label="CURRENT_PASSWORD"
      />
      <BaseInput
        v-model="ChangePassword.newPassword"
        :rules="passwordHints.current"
        class="changer-password__input"
        type="password"
        placeholder="PASSWORD_CREATE_PLACEHOLDER"
        label="NEW_PASSWORD"
      />
      <BaseInput
        v-model="ChangePassword.repeatNewPassword"
        :rules="passwordHints.new"
        class="changer-password__input"
        type="password"
        placeholder="PASSWORD_CREATE_PLACEHOLDER"
        label="REPEAT_NEW_PASSWORD"
      />
      <button
        v-loading="isLoadingButton"
        :disabled="!valid"
        type="submit"
        class="base-primary-button w-100 changer-password_button"
      >
        {{ $t("CONFIRM_PASSWORD") }}
      </button>
    </BaseForm>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useServices } from "@/composables/useServices";
import { useUserStore } from "@/store/user";
import { PASSWORD_REG_EXP } from "@/utils/regular-expresions";

const { t } = useI18n();
const $service = useServices();
const user = useUserStore();
const router = useRouter();

const ChangePassword = ref({ oldPassword: "", newPassword: "", repeatNewPassword: "" });
const isLoadingButton = ref(false);

const passwordHints = {
  current: [
    (value) => !value && t("PASSWORD_REQUIRED"),
    (value) => !PASSWORD_REG_EXP.test(value) && t("PASSWORD_INVALID"),
    (value) => value.length < 4 && t("MIN_CHARS", { number: 4 }),
    (value) => value.length > 128 && t("MAX_CHARS", { number: 128 })
  ],
  new: [
    (value) => !value && t("PASSWORD_REQUIRED"),
    (value) => !PASSWORD_REG_EXP.test(value) && t("PASSWORD_INVALID"),
    (value) => value.length < 4 && t("MIN_CHARS", { number: 4 }),
    (value) => value.length > 128 && t("MAX_CHARS", { number: 128 }),
    (value) => value !== ChangePassword.value.newPassword && t("PASSWORD_EQUAL")
  ]
};

const Change = async () => {
  if (isLoadingButton.value) return;
  isLoadingButton.value = true;
  await $service.user.ChangePassword({
    oldPassword: ChangePassword.value.oldPassword,
    newPassword: ChangePassword.value.newPassword
  });
  isLoadingButton.value = false;
};

onMounted(() => {
  if (!user.getUserInfo.isVerified) {
    router.push({ name: "Settings" });
  }
});
</script>
<style lang="scss">
.change-password {
  &__title {
    padding: 24px 16px;
  }

  &__link {
    display: flex;
    padding-left: 16px;
  }

  &__form {
    padding: 40px 16px;
  }
}

@media screen and(min-width: 769px) {
  .change-password {
    max-width: 416px;
    margin: 0 auto;

    &__title {
      padding-bottom: 40px;
      text-align: center;
    }

    &__link {
      padding-left: 0;
    }

    &__form {
      padding: 40px 0;
    }
  }
}
</style>
