<template>
  <label class="base-radio">
    <input
      class="base-radio__input"
      :value="val"
      :disabled="disabled"
      :name="modelValue"
      :checked="isChecked"
      type="radio"
      @change="onChange"
    />
    <div class="base-radio__core"></div>
    <div v-if="label" class="base-radio__label">{{ label }}</div>
  </label>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    required: true
  },
  label: {
    type: String,
    required: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  val: {
    required: true
  }
});

const isChecked = props.modelValue === props.val;

const emit = defineEmits(["update:modelValue"]);

const onChange = () => {
  emit("update:modelValue", props.val);
};
</script>
<style lang="scss" scoped>
.base-radio {
  position: relative;
  display: flex;
  align-items: center;

  &__input {
    width: 1px;
    height: 1px;
    position: absolute;
    appearance: none;
    -webkit-appearance: none;
  }

  &__core {
    position: relative;
    width: 20px;
    height: 20px;
    border: 2px solid var(--base-bg-0);
    border-radius: 50%;
    cursor: pointer;
    outline-color: transparent;
    transition: all 250ms ease-in-out;
    transition-property: transform, outline-color, border-color;
  }

  //&__core:hover {
  //  border-color: var(--base-bg-13);
  //  &::before {
  //    border-color: var(--base-bg-13) !important;
  //  }
  //}

  //&__input:checked ~ .base-radio__core:hover::before {
  //  background-color: var(--base-bg-13) !important;
  //  border-color: var(--base-bg-13) !important;
  //}

  &:active .base-radio__core {
    transform: scale(0.9);
  }

  &__input:focus-visible ~ .base-radio__core {
    outline: 2px solid var(--base-bg-13);
    outline-offset: 2px;
    //border-color: var(--base-bg-13);
    //&::before {
    //  background-color: var(--base-bg-13) !important;
    //  border-color: var(--base-bg-13) !important;
    //}
  }

  .base-radio__core::before {
    top: -2px;
    left: -2px;
    z-index: 10;
    position: absolute;
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid var(--base-bg-0);
    border-radius: 50%;
    transition: all 250ms ease-in-out;
    transition-property: border-color, background-color, transform;

    &:hover {
      border-color: var(--base-bg-13);
    }
  }

  &__input:checked ~ .base-radio__core::before {
    background-color: var(--base-bg-0);
    transform: scale(0.6);
  }

  &__input:disabled ~ .base-radio__core,
  &__input:disabled ~ .base-radio__core::before {
    border-color: var(--base-bg-4);
    cursor: not-allowed;
  }

  &__label {
    margin-left: 8px;
    cursor: pointer;
    color: var(--base-text-0);
  }

  &__input:disabled ~ .base-radio__label {
    color: var(--base-bg-4);
    cursor: not-allowed;
  }
}
</style>
