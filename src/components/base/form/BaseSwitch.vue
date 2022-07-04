<template>
  <label class="base-switch">
    <div :class="['base-switch__toggle', { disabled }, { checked: modelValue }]">
      <input :disabled="disabled" :checked="modelValue" type="checkbox" class="base-switch__input" @change="onChange" />
      <div class="base-switch__dot"></div>
    </div>
    <div v-if="label" class="base-switch__label">{{ label }}</div>
  </label>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
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

<style lang="scss">
.base-switch {
  position: relative;
  display: flex;
  align-items: center;

  &__toggle {
    position: relative;
    border: 2px solid var(--primary-color);
    cursor: pointer;
    width: 34px;
    height: 20px;
    margin: 4px;
    padding: 2px;
    border-radius: 4px;
    overflow: hidden;
    background-image: radial-gradient(ellipse at center, var(--primary-color) 50%, transparent 50%);
    background-repeat: no-repeat;
    background-size: 200% 300%;
    background-position: right -100% top 50%;
    transition: all 250ms ease-in-out;

    &.checked {
      background-position: right 40% top 50%;
    }

    &.disabled {
      border-color: var(--disabled-primary-color);
      cursor: not-allowed;

      .base-switch__dot {
        background-color: var(--disabled-primary-color);
      }

      &.checked {
        background-image: radial-gradient(ellipse at center, var(--disabled-primary-color) 50%, transparent 50%);
      }

      ~ .base-switch__label {
        color: var(--disabled-primary-color);
        cursor: not-allowed;
      }
    }

    &:active {
      transform: scale(0.9);

      .base-switch__dot {
        width: 14px;
      }

      .base-switch__input:checked + .base-switch__dot {
        left: calc(100% - 16px);
      }
    }
  }

  &__input {
    width: 1px;
    height: 1px;
    position: absolute;
    appearance: none;
  }

  &__dot {
    position: absolute;
    z-index: 10;
    width: 12px;
    height: 12px;
    background-color: var(--primary-color);
    border-radius: 2px;
    left: 2px;
    transition: all ease-in-out 200ms;
  }

  &__input:checked {
    ~ .base-switch__dot {
      left: calc(100% - 14px);
      background-color: var(--background-main);
    }
  }

  &__label {
    cursor: pointer;
    margin-left: 10px;
  }
}
</style>
