<template>
  <form ref="slotRef" @submit.prevent="onSubmit">
    <slot />
  </form>
</template>

<script setup>
import { ref, useSlots } from "vue";

const slots = useSlots();
const emit = defineEmits(["submit"]);

const slotRef = ref(null);

const validateForm = () => {
  console.log("SLOTS", slots.default());
  console.log(slotRef.value);
};

const onSubmit = () => {
  emit("submit");
};

defineExpose({
  validateForm
});
</script>
