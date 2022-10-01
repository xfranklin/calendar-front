<template>
  <div v-click-outside="close" :class="['base-select', { open: open }]">
    <label v-if="label" :for="uid" class="base-select__label">{{ $t(label) }}</label>
    <div ref="field" class="base-select__field-wrap" @click="toggle">
      <input
        :id="uid"
        ref="inputRef"
        :value="value"
        type="text"
        autocomplete="off"
        :placeholder="$t(placeHolder)"
        readonly
        class="base-select__field"
      />
      <BaseIcon class="base-select__field-icon" name="chevron-down" group="chevrons" />
    </div>
    <transition name="select">
      <div v-show="open" ref="list" class="base-select__list">
        <div
          v-for="(option, key) in options"
          :key="key"
          :class="['base-select__list-item', { active: modelValue === (option.value || option) }]"
          @click="setActive(option)"
        >
          {{ option.label ? option.label : option }}
          <BaseIcon v-if="modelValue === (option.value || option)" class="base-select__list-item-icon" name="check" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from "vue";
import { autoUpdate, computePosition, offset, flip } from "@floating-ui/dom";

const props = defineProps({
  modelValue: {
    required: true
  },
  label: {
    type: String
  },
  placeHolder: {
    type: String,
    default: "PLACEHOLDER_SELECT"
  },
  options: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(["update:modelValue", "change"]);

const uid = getCurrentInstance().uid;

const open = ref(false);
const field = ref(null);
const inputRef = ref(null);
const list = ref(null);
let cleanup = null;

const value = computed(() => {
  if (props.modelValue != null) {
    if (typeof props.options[0] !== "object") {
      return props.modelValue;
    } else {
      return props.options.find(({ value }) => value === props.modelValue)?.label;
    }
  }
  return "";
});

const toggle = () => {
  open.value = !open.value;
  if (open.value) {
    cleanup = autoUpdate(field.value, list.value, position);
  } else {
    cleanup();
  }
};

const close = () => {
  open.value && toggle();
};

const position = () => {
  computePosition(field.value, list.value, { middleware: [flip(), offset(2)] }).then(({ y, placement }) => {
    ["top", "bottom"].forEach((value) => list.value.classList.remove(value));
    list.value.classList.add(placement);
    Object.assign(list.value.style, { top: `${y}px` });
  });
};

const setActive = (option) => {
  const value = option?.value ?? option;
  emit("update:modelValue", value);
  emit("change", value);
  toggle();
};

const focus = () => {
  inputRef.value.focus();
};

defineExpose({
  focus
});
</script>

<style lang="scss" scoped>
.base-select {
  position: relative;
  width: 100%;

  &__label {
    display: inline-block;
    font-size: 1rem;
    line-height: 1.5rem;
    color: var(--base-bg-2);
    margin-bottom: 2px;
    cursor: pointer;
    transition: color 200ms ease-in-out;
  }

  &.open .base-select__label,
  &:focus-within .base-select__label {
    color: var(--base-text-3);
  }

  &__field-wrap {
    position: relative;
  }

  &__field {
    width: 100%;
    padding: 9px 10px;
    font-size: 0.75rem;
    line-height: 1.125rem;
    border: 2px solid var(--base-bg-2);
    border-radius: 4px;
    background-color: var(--base-page-bg);
    cursor: pointer;
    color: var(--base-text-5);
    caret-color: var(--base-text-3);
    transition: all 200ms ease-in-out;
    transition-property: box-shadow, border-color;

    &:hover {
      box-shadow: var(--base-shadow-0);
    }

    &::placeholder {
      color: var(--base-text-4);
    }

    &:focus {
      border-color: var(--base-bg-3);
    }
  }

  &.open .base-select__field {
    border-color: var(--base-bg-3);
    box-shadow: none;
  }

  &__field-icon {
    position: absolute;
    right: 10px;
    bottom: 8px;
    width: 24px;
    height: 24px;
    pointer-events: none;
    transition: all 125ms linear;
    transition-property: transform;
  }

  &.open .base-select__field-icon {
    transform: rotate(180deg);
  }

  &__list {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 190px;
    overflow-y: auto;
    border: 2px solid var(--base-bg-3);
    background-color: var(--base-page-bg);
    border-radius: 4px;

    &.bottom {
      transform-origin: top center;
    }

    &.top {
      transform-origin: bottom center;
    }
  }

  &__list-item {
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 0.75rem;
    line-height: 1.125rem;
    cursor: pointer;
    color: var(--base-text-4);
    transition: all 250ms ease;
    transition-property: background-color;

    &:hover {
      background-color: var(--base-bg-11);
      color: var(--color-blue-dark-medium) !important;
    }

    &.active {
      font-weight: 500;
      color: var(--base-text-0);
    }
  }

  &__list-item-icon {
    width: 16px;
    height: 16px;
    margin-left: 8px;
  }
}

.select-enter-active,
.select-leave-active {
  transition: all 125ms ease-in;
  transition-property: transform, opacity;
}

.select-enter-from,
.select-leave-to {
  opacity: 0 !important;
  transform: scale(1, 0.35);
}

.select-leave-from,
.select-enter-to {
  opacity: 1 !important;
  transform: scale(1);
}
</style>
