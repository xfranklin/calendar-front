<template>
  <div :class="['base-input', { error: errorMessage }, type]">
    <label v-if="label" :for="uid" :class="['base-input__label', { disabled }]">{{ $t(label) }}</label>
    <div class="base-input__field-wrap">
      <input
        :id="uid"
        ref="inputRef"
        :value="modelValue"
        :type="fieldType"
        :disabled="disabled"
        :placeholder="placeholder && $t(placeholder)"
        class="base-input__field"
        @input="updateValue"
      />
      <button v-if="type === 'password'" type="button" class="base-input__password-button" @click="togglePassword">
        <BaseIcon :name="passwordIcon" group="view" />
      </button>
    </div>
    <div class="base-input__error">
      <template v-if="errorMessage">{{ errorMessage }}</template>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, onUnmounted, inject } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "text"
  },
  label: {
    type: String
  },
  placeholder: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Array,
    default: null
  }
});

const emit = defineEmits(["update:modelValue"]);

const uid = getCurrentInstance().uid;
const fieldType = ref(props.type);
const isValid = ref(false);
const passwordIcon = ref(props.type === "password" ? "eye" : null);
const inputRef = ref(null);
const errorMessage = ref(null);

const baseForm = inject("baseForm");

const updateValue = ({ target }) => {
  emit("update:modelValue", target.value);
  validateInput(target.value);
};

const validateInput = (value = props.modelValue) => {
  if (props.rules?.length) {
    isValid.value = props.rules.reduce((acc, cb) => {
      if (!acc) acc = cb(value);
      return acc;
    }, null);
    errorMessage.value = isValid.value;
    isValid.value = !isValid.value;
    if (baseForm?.setValidation) {
      baseForm?.setValidation(isValid, uid);
    }
    return isValid.value;
  }
  return true;
};

const togglePassword = () => {
  fieldType.value = fieldType.value === "password" ? "text" : "password";
  passwordIcon.value = fieldType.value === "password" ? "eye" : "eye-off";
  inputRef.value.focus();
};

onMounted(() => {
  if (baseForm?.bind) {
    baseForm.bind({ validateInput, uid });
    baseForm.setValidation(isValid.value, uid);
  }
});

onUnmounted(() => {
  if (baseForm?.unBind) {
    baseForm.unBind({ validateInput, uid });
  }
});

defineExpose({
  validateInput
});
</script>

<style scoped lang="scss">
.base-input {
  width: 100%;
  margin-bottom: 4px;

  &__label {
    display: inline-block;
    font-size: 1rem;
    color: var(--base-bg-2);
    margin-bottom: 2px;
    cursor: pointer;
    transition: color 200ms ease-in-out;
  }

  &:focus-within .base-input__label {
    color: var(--base-text-3);
  }

  &__label.disabled {
    color: var(--base-text-6);
    cursor: not-allowed;
  }

  &__field-wrap {
    position: relative;
  }

  &.error .base-input__label {
    color: var(--base-text-8);
    transition: none;
  }

  &__field {
    width: 100%;
    padding: 9px 10px;
    font-size: 0.75rem;
    line-height: 1.5;
    border: 2px solid var(--base-bg-2);
    border-radius: 4px;
    background-color: var(--base-page-bg);
    cursor: text;
    color: var(--base-text-5);
    caret-color: var(--base-text-3);
    transition: all 200ms ease-in-out;
    transition-property: box-shadow, border-color;

    &:hover {
      box-shadow: var(--base-shadow-0);
    }

    &:focus {
      border-color: var(--base-bg-3);
    }

    &:disabled {
      color: var(--base-text-6);
      border-color: var(--base-bg-4);
      cursor: not-allowed;
    }

    &:disabled:hover {
      box-shadow: none;
    }

    &::placeholder {
      color: var(--base-text-4);
    }
  }

  &:focus-within .base-input__field {
    border-color: var(--base-bg-3);
  }

  &.password .base-input__field {
    padding-right: 42px;
  }

  &.error .base-input__field {
    border-color: var(--base-bg-6);
    transition: none;
  }

  &__password-button {
    position: absolute;
    right: 10px;
    bottom: 8px;
    display: flex;
    padding: 0;
    border: 0;
    border-radius: 4px;
    background-color: transparent;
    cursor: pointer;
    outline-color: transparent;
    transition: all 200ms ease-in-out;
    transition-property: transform, outline-color;

    &:active {
      transform: scale(0.9);
    }

    &:focus-visible {
      outline: 2px solid var(--base-bg-3);
    }

    &:focus-visible:hover {
      outline-color: var(--base-bg-3);
    }

    .base-icon {
      transition: color 200ms ease-in-out;
      width: 24px;
      height: 24px;
      color: var(--base-bg-2);
    }

    &:hover .base-icon {
      color: var(--base-bg-3);
    }

    &:hover ~ .base-input__field {
      box-shadow: var(--base-shadow-0);
    }
  }

  &__error {
    height: 18px;
    margin-top: 2px;
    font-size: 12px;
    line-height: 1.5;
    color: var(--base-text-8);
  }
}
</style>
