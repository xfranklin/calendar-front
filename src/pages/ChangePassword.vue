<template>
  <div class="change-password">
    <h2 class="headline-2 change-password__title">Change Password</h2>
    <router-link class="base-link icon change-password__link" :to="{ name: 'Settings' }">
      <BaseIcon name="chevron-left" group="chevrons" />{{ $t("BACK_TO_SETTINGS") }}</router-link
    >
    <BaseForm v-slot="{ valid }" class="change-password__form" @submit="changePassword">
      <BaseInput
        v-model="changePasswordForm.oldPassword"
        :rules="passwordHints.current"
        class="changer-password_input"
        type="password"
        placeholder="PASSWORD"
        label="CURRENT_PASSWORD"
      />
      <BaseInput
        v-model="changePasswordForm.newPassword"
        :rules="passwordHints.current"
        class="changer-password__input"
        type="password"
        placeholder="NEW_PASSWORD"
        label="NEW_PASSWORD"
      />
      <BaseInput
        v-model="changePasswordForm.repeatNewPassword"
        :rules="passwordHints.new"
        class="changer-password__input"
        type="password"
        placeholder="ENTER_PASSWORD_AGAIN"
        label="REPEAT_NEW_PASSWORD"
      />
      <button
        v-loading="isLoadingButton"
        :disabled="!valid"
        type="submit"
        class="base-primary-button w-100 change-password__confirm-button"
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
import { Entrypoints } from "@/utils/entrypoints";
import { useUserStore } from "@/store/user";
import { PASSWORD_REG_EXP } from "@/utils/regular-expresions";

const { t } = useI18n();
const $service = useServices();
const user = useUserStore();
const router = useRouter();

const changePasswordForm = ref({ oldPassword: "", newPassword: "", repeatNewPassword: "" });
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
    (value) => value !== changePasswordForm.value.newPassword && t("PASSWORD_EQUAL")
  ]
};

const changePassword = async () => {
  if (isLoadingButton.value) return;
  isLoadingButton.value = true;
  const isChanged = await $service.user.changePassword({
    oldPassword: changePasswordForm.value.oldPassword,
    newPassword: changePasswordForm.value.newPassword
  });
  isChanged && clearForm();
  isLoadingButton.value = false;
};

const clearForm = () => {
  changePasswordForm.value.oldPassword = "";
  changePasswordForm.value.newPassword = "";
  changePasswordForm.value.repeatNewPassword = "";
};

onMounted(() => {
  if (!user.getUserInfo.isVerified || user.getEntrypoints[0].type !== Entrypoints.EMAIL) {
    router.push({ name: "Settings" });
  }
});
</script>
<style lang="scss">
.change-password {
  box-sizing: content-box;
  max-width: 536px;
  margin: 0 auto;
  padding: 0 16px;

  &__title {
    padding: 24px 0;
  }

  &__link {
    display: flex;
  }

  &__form {
    padding: 40px 0;
  }

  &__confirm-button {
    margin-top: 20px;
  }
}

@media screen and(min-width: 769px) {
  .change-password {
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
