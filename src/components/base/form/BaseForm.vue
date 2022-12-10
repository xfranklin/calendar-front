<template>
  <form @submit.prevent="onSubmit">
    <slot v-bind="{ valid: isFormValid }" />
  </form>
</template>

<script setup>
import { ref, computed, provide } from "vue";

const emit = defineEmits(["submit"]);
const state = ref({ validatedComponents: [], isValid: {} });

const isFormValid = computed(() => {
  return Object.entries(state.value.isValid).every(([, value]) => value);
});

const bind = (component) => {
  state.value.validatedComponents.push(component);
};

const unBind = ({ uid }) => {
  state.value.validatedComponents = state.value.validatedComponents.filter((c) => c.uid !== uid);
  delete state.value.isValid[uid];
};

const setValidation = (value, uid) => {
  state.value.isValid[uid] = value;
};

const onSubmit = () => {
  const isValid = validateForm();
  if (isValid) {
    emit("submit");
  }
};

const validateForm = () => {
  if (!state.value.validatedComponents.length) return true;
  return state.value.validatedComponents.reduce((acc, { validateInput }) => {
    const isValid = validateInput();
    if (acc === false) return acc;
    acc = isValid;
    return acc;
  }, null);
};

defineExpose({
  validateForm
});

provide("baseForm", { bind, unBind, setValidation });
</script>
