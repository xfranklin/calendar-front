<template>
  <div class="birth-picker">
    <BaseInput
      ref="dayRef"
      :model-value="birth.day"
      :rules="[required]"
      :pattern="/[^0-9]/g"
      :max="2"
      label="DAY"
      placeholder="DAY_PLACEHOLDER"
      class="birth-picker__day"
      @update:modelValue="dayValidate"
    />
    <BaseSelect ref="monthRef" v-model="birth.month" :options="optionsMounts" label="MONTH" @change="dayUpdate" />
    <BaseSelect
      ref="yearRef"
      v-model="birth.year"
      :options="optionsYears"
      label="YEAR"
      place-holder="YEAR_PLACEHOLDER"
      @change="dayUpdate"
    />
  </div>
  <pre>{{ modelValue }}</pre>
</template>
<script setup>
import { getAllMonths } from "@/utils/get-mounts";
import BaseSelect from "@/components/base/form/BaseSelect.vue";
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);
const { locale, t } = useI18n();

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

const optionsMounts = getAllMonths(locale.value).map((value, index) => ({ label: value, value: index }));
const optionsYears = Array.from({ length: 123 }, (_, i) => 2022 - i);

const required = (value) => !value && t("ERROR_REQUIRED");

let date;
try {
  date = new Date(props.modelValue);
} catch (e) {
  console.error(e);
}

const birth = ref({
  day: date?.getDate() || "",
  month: date?.getMonth() || "",
  year: date?.getFullYear() || ""
});

const dayRef = ref(null);
const monthRef = ref(null);
const yearRef = ref(null);

const dayValidate = (value, focusable = true) => {
  const month = birth.value.month;
  const year = birth.value.year;
  let day = value;
  if (value.length === 2) {
    day = Number(value);

    let MAX_DAY = 31;
    if (month !== "") {
      MAX_DAY = [3, 5, 8, 10].includes(month) ? 30 : 31;
      if (month === 1) {
        MAX_DAY = 29;
        if (year && !isLeakYear(year)) {
          MAX_DAY = 28;
        }
      }
    }

    day = day >= 1 && day <= MAX_DAY ? day : MAX_DAY;
    if (focusable) {
      nextFocus();
    }
  }
  birth.value = { day: String(day), year, month };
};

const dayUpdate = () => {
  dayValidate(birth.value.day, false);
  nextFocus();
};

const nextFocus = () => {
  if (!birth.value.day) {
    dayRef.value.focus();
  } else if (!birth.value.month) {
    monthRef.value.focus();
  } else if (!birth.value.year) {
    yearRef.value.focus();
  }
};

const isLeakYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

watch(
  () => birth,
  (value) => {
    const { day, month, year } = value.value;
    if (Number(day) && month !== "" && year) {
      try {
        const birthDay = new Date(Date.UTC(year, month, Number(day))).toISOString();
        emit("update:modelValue", birthDay);
      } catch (e) {
        console.error(e);
      }
    } else {
      emit("update:modelValue", "");
    }
  },
  {
    deep: true
  }
);
</script>
<style scoped>
.birth-picker {
  display: flex;
  gap: 24px;
}
</style>
