<template>
  <h1 class="subtitle-1">{{ $t("PERSONAL_DETAILS") }}</h1>
  <BaseForm v-slot="{ valid }" class="onboarding__form" @submit="onboard">
    <div class="onboarding__personal">
      <BaseInput v-model="formData.name" :rules="rules" label="NAME_LABEL" placeholder="NAME_PLACEHOLDER" />
      <BaseInput v-model="formData.surname" :rules="rules" label="SURNAME_LABEL" placeholder="SURNAME_PLACEHOLDER" />
    </div>
    <h2 class="subtitle-2">{{ $t("DATE_OF_BIRTH") }}</h2>
    <div class="onboarding__birthday-description small-text">{{ $t("DATE_ASK_REASON") }}</div>
    <div class="onboarding__birthday">
      <BaseInput
        v-model="formData.day"
        :rules="[required]"
        label="DAY"
        placeholder="DAY_PLACEHOLDER"
        class="onboarding__birthday-day"
      />
      <BaseSelect v-model="formData.month" :options="options" label="MONTH" />
      <BaseInput
        v-model="formData.year"
        :rules="[required]"
        label="YEAR"
        placeholder="YEAR_PLACEHOLDER"
        class="onboarding__birthday-year"
      />
    </div>
    <button v-loading="isLoading" :disabled="!formData.month || !valid" type="submit" class="base-primary-button w-100">
      {{ $t("CONFIRM_PERSONAL_DETAILS") }}
    </button>
  </BaseForm>
</template>
<script setup>
import { getAllMonths } from "@/utils/get-mounts";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import BaseSelect from "@/components/base/form/BaseSelect.vue";

const { t, locale } = useI18n();
const isLoading = ref(false);

const required = (value) => !value && t("ERROR_REQUIRED");
const rules = [required, (value) => value.length > 128 && t("MAX_CHARS", { number: 128 })];

const options = getAllMonths(locale.value).map((value, index) => ({ label: value, value: index }));

const formData = ref({
  name: "",
  surname: "",
  day: "",
  month: "",
  year: ""
});

const onboard = () => {
  if (!isLoading.value) {
    isLoading.value = true;
    console.log(formData.value);

    // isLoading.value = false;
  }
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
  &__birthday {
    display: flex;
    margin-top: 8px;
    margin-bottom: 20px;
    gap: 24px;
  }
  &__birthday-day,
  &__birthday-year {
    flex: 1 0 64px;
  }
}

@media screen and (min-width: 1200px) {
  .onboarding {
    &__birthday-day,
    &__birthday-year {
      flex: auto;
    }
  }
}
</style>
