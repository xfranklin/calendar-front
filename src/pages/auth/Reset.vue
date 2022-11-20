<template>
  <h1 class="subtitle-1">{{ $t("RESET_PASSWORD") }}</h1>
  <div class="reset__description base-text">
    {{ $t("ENTER_YOUR_NEW_PASSWORD") }}.<router-link class="base-link" :to="{ name: 'Login' }">{{
      $t("BACK_TO_SIGN_IN")
    }}</router-link
    >.
  </div>
  <BaseForm v-slot="{ valid }" class="reset__form">
    <BaseInput :model-value="resetForm.email" :disabled="true" label="EMAIL" />
    <BaseInput v-model="resetForm.password" type="password" label="NEW_PASSWORD" placeholder="PASSWORD" />
    <BaseInput
      v-model="resetForm.confirmPassword"
      type="password"
      label="CONFIRM_NEW_PASSWORD"
      placeholder="ENTER_PASSWORD_AGAIN"
    />
    <button :disabled="!valid" class="base-primary-button w-100 reset__form-button">
      {{ $t("CONFIRM_NEW_PASSWORD") }}
    </button>
  </BaseForm>
</template>
<script setup>
import { ref } from "vue";

const resetForm = ref({ email: "giorgiomod@gmail.com", password: "", confirmPassword: "" });
</script>
<style lang="scss" scoped>
.subtitle-1 {
  color: var(--base-text-14);
}

.reset {
  &__description {
    margin-top: 16px;
  }

  &__form {
    margin-top: 40px;
  }

  &__form-button {
    margin-top: 16px;
  }
}
</style>
