<template>
  <label class="base-switch">
    <!--    on label active animate core-->
    <input :disabled="disabled" :checked="modelValue" type="checkbox" class="base-switch__input" @change="onChange" />
    <div class="base-switch__core">
      <div class="base-switch__dot"></div>
    </div>
    <div v-if="label" class="base-switch__label">{{ label }}</div>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:modelValue"]);

const onChange = ({ target }) => {
  emit("update:modelValue", target.checked);
};
</script>

<style scoped lang="scss">
.base-switch {
  position: relative;
  display: flex;
  align-items: center;

  // base-switch__input

  &__input {
    width: 1px;
    height: 1px;
    position: absolute;
    appearance: none;
  }

  // base-switch__core

  &__core {
    position: relative;
    border: 2px solid var(--base-bg-0);
    cursor: pointer;
    width: 34px;
    height: 20px;
    margin: 4px;
    padding: 2px;
    border-radius: 4px;
    overflow: hidden;
    background-image: radial-gradient(ellipse at center, var(--base-bg-0) 50%, transparent 50%);
    background-repeat: no-repeat;
    background-size: 200% 300%;
    background-position: right -100% top 50%;
    transition: all 250ms ease-in-out;
    outline-color: transparent;
    transition-property: transform, background-position, outline-color;

    &:active {
      transform: scale(0.9);
    }
  }

  &__input:active ~ .base-switch__core {
    transform: scale(0.9);
  }

  &__input:checked ~ .base-switch__core {
    background-position: right 40% top 50%;
  }

  &__input:disabled ~ .base-switch__core {
    border-color: var(--base-primary-disabled);
    cursor: not-allowed;
  }

  &__input:disabled:checked ~ .base-switch__core {
    background-image: radial-gradient(ellipse at center, var(--base-primary-disabled) 50%, transparent 50%);
  }

  &__input:focus-visible ~ .base-switch__core {
    outline: 2px solid var(--base-bg-0);
    outline-offset: 2px;
  }

  // base-switch__dot

  &__dot {
    position: absolute;
    z-index: 10;
    width: 12px;
    height: 12px;
    background-color: var(--base-bg-0);
    border-radius: 2px;
    left: 2px;
    transition: all ease-in-out 200ms;
  }

  &__core:active .base-switch__dot {
    width: 14px;
  }

  &__input:checked ~ .base-switch__core .base-switch__dot {
    left: calc(100% - 14px);
    background-color: var(--base-bg-1);
  }

  &__input:disabled:not(:checked) ~ .base-switch__core .base-switch__dot {
    background-color: var(--base-primary-disabled);
  }

  &__input:checked ~ .base-switch__core:active .base-switch__dot {
    left: calc(100% - 16px);
  }

  // base-switch__label

  &__label {
    margin-left: 6px;
    cursor: pointer;
    color: var(--base-text-0);
  }

  &__input:disabled ~ .base-switch__label {
    color: var(--base-primary-disabled);
    cursor: not-allowed;
  }
}
</style>
