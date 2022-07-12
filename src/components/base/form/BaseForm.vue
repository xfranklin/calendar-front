<template>
  <form ref="slotRef" @submit.prevent="onSubmit">
    <slot />
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["submit"]);

const slotRef = ref(null);

const validateForm = () => {
  console.log("validate form");
  console.log(slotRef.value);
};

const onSubmit = () => {
  emit("submit");
};

defineExpose({
  validateForm
});
</script>
