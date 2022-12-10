<template>
  <button class="base-danger-outlined-button icon" @click="deleteModal = true">
    <BaseIcon name="trash" />{{ $t("DELETE_ACCOUNT") }}
  </button>
  <BaseModal v-model:open="deleteModal" :fullscreen="true">
    <div class="delete-modal">
      <h1 class="headline-3 delete-modal__title">{{ $t("DELETE_ACCOUNT") }}</h1>
      <p class="base-text delete-modal__effects-title">{{ $t("DELETE_EFFECTS") }}</p>
      <p class="base-text delete-modal__effect"><BaseIcon name="alert-close" />{{ $t("DELETE_EFFECT_1") }}</p>
      <p class="base-text delete-modal__effect"><BaseIcon name="alert-close" />{{ $t("DELETE_EFFECT_2") }}</p>
      <p class="base-text delete-modal__effect"><BaseIcon name="alert-close" />{{ $t("DELETE_EFFECT_3") }}</p>
      <p class="base-text delete-modal__effects-result">{{ $t("DELETE_EFFECT_RESULT") }}</p>
      <hr class="delete-modal__divider" />
      <h2 class="subtitle-1 delete-modal__question-title">{{ $t("DELETE_ANSWER_QUESTION") }}</h2>
      <p class="base-text delete-modal__question">{{ $t("DELETE_QUESTION") }}</p>
      <BaseForm v-slot="{ valid }" class="delete-modal__form" @submit="deleteAccount">
        <BaseRadio v-model="deleteReason" val="0" label="DELETE_VAR_1" class="delete-modal__radio" />
        <BaseRadio v-model="deleteReason" val="1" label="DELETE_VAR_2" class="delete-modal__radio" />
        <BaseRadio v-model="deleteReason" val="2" label="DELETE_VAR_3" class="delete-modal__radio" />
        <transition name="reason">
          <BaseInput
            v-if="deleteReason === '2'"
            v-model="otherReason"
            :rules="rules"
            placeholder="DELETE_QUESTION_PLACEHOLDER"
            class="delete-modal__reason"
        /></transition>
        <button
          v-loading="loading"
          type="submit"
          class="base-danger-button w-100 delete-modal__submit-button"
          :disabled="!deleteReason || !valid"
        >
          {{ $t("DELETE") }}
        </button>
      </BaseForm>
    </div>
  </BaseModal>
</template>
<script setup>
import BaseModal from "@/components/base/feedback/BaseModal.vue";
import BaseRadio from "@/components/base/form/BaseRadio.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useServices } from "@/composables/useServices";
import { ref } from "vue";
const $services = useServices();

const { t } = useI18n();
const router = useRouter();

const rules = [
  (value) => !value && t("ERROR_REQUIRED"),
  (value) => value.length > 128 && t("MAX_CHARS", { number: 128 })
];

const deleteModal = ref(false);
const deleteReason = ref(null);
const otherReason = ref("");
const loading = ref(false);

const deleteAccount = async () => {
  if (loading.value) return;
  loading.value = true;
  await $services.user.deleteAccount({
    type: deleteReason.value,
    ...(otherReason.value && { other: otherReason.value })
  });
  loading.value = false;
};
</script>
<style lang="scss">
.delete-modal {
  display: flex;
  flex-direction: column;
  max-width: 452px;
  margin: 0 auto;
  padding: 68px 16px 48px;

  &__title {
    padding-bottom: 16px;
    color: var(--base-text-0);
  }
  &__effects-title {
    padding-bottom: 8px;
    color: var(--base-text-0) !important;
  }
  &__effect {
    display: flex;
    color: var(--base-bg-6) !important;
    svg {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
  &__effects-result {
    padding-top: 8px;
    color: var(--base-text-0) !important;
  }
  &__divider {
    margin: 40px 0;
    background-color: var(--base-text-0);
  }
  &__question-title {
    padding-bottom: 16px;
    color: var(--base-text-0) !important;
  }
  &__question {
    color: var(--base-text-0) !important;
  }
  &__form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    margin-top: 2px;
  }
  &__radio {
    margin-bottom: 2px;

    &:last-of-type {
      margin-bottom: 16px;
    }
  }
  &__reason {
  }
  &__submit-button {
    margin-top: 40px;
  }
}

@media screen and (min-width: 769px) {
  .delete-modal {
    padding-top: 108px;
    min-height: 100vh;

    &__submit-button {
      margin-top: auto;
    }
  }
}

.reason-enter-active,
.reason-leave-active {
  transition: all 250ms linear;
  overflow: hidden;
}

.reason-enter-from,
.reason-leave-to {
  opacity: 0 !important;
  height: 0 !important;
}

.reason-enter-to,
.reason-leave-from {
  height: 64px !important;
}
</style>
