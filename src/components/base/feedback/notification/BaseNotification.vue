<template>
  <transition name="notification" @before-enter="beforeEnter" @enter="enter" @after-leave="afterLeave">
    <div v-show="visible" :class="['base-notification', type]">
      <component :is="iconName" :class="['base-notification__icon']"></component>
      <div class="base-notification__message">{{ message }}</div>
      <button class="base-notification__close-button" @click="close">
        <CloseIcon name="close" class="close-icon" />
      </button>
    </div>
  </transition>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CloseIcon from "@/assets/icons/regular/close.svg";
import InfoIcon from "@/assets/icons/regular/info.svg";
import AlertOctagonIcon from "@/assets/icons/regular/alert-octagon.svg";
import AlertTriangleIcon from "@/assets/icons/regular/alert-triangle.svg";
import CheckCircleIcon from "@/assets/icons/regular/check-circle.svg";

const props = defineProps({
  type: {
    type: String,
    default: "default"
  },
  duration: {
    type: [Number, String],
    default: 3500
  },

  message: {
    type: String,
    required: true
  }
});

const emit = defineEmits(["destroy"]);

const visible = ref(false);
let timer;

// TODO refactor to defineAsyncComponent
let iconName = null;
switch (props.type) {
  case "default":
    iconName = InfoIcon;
    break;
  case "warning":
    iconName = AlertOctagonIcon;
    break;
  case "error":
    iconName = AlertTriangleIcon;
    break;
  case "success":
    iconName = CheckCircleIcon;
    break;
}

const close = () => {
  visible.value = false;
};

const beforeEnter = (el) => {
  debugger;
  el.style.padding = "0 10px";
  el.style.maxHeight = "0px";
};

const enter = (el) => {
  console.log("scrollHeight", el.scrollHeight);
  el.style.maxHeight = `${el.scrollHeight + 20}px`;
  el.style.padding = "10px";
};

const afterLeave = () => {
  emit("destroy");
};

onMounted(() => {
  visible.value = true;
  if (props.duration === "none") return;
  timer = setTimeout(() => {
    close();
  }, props.duration);
});

onUnmounted(() => {
  clearTimeout(timer);
});
</script>

<style scoped lang="scss">
.base-notification {
  position: relative;
  width: 100%;
  margin: 3px 0;
  color: var(--color-blue-dark);
  transition: all 150ms ease-in-out;
  transition-property: transform;
  overflow: hidden;
  box-shadow: var(--base-shadow-2);

  .close-icon {
    color: var(--color-blue-dark);
  }

  &.default {
    color: var(--base-text-2);
    background-color: var(--base-bg-8);

    .close-icon {
      color: var(--base-text-2);
    }
  }

  &.warning {
    background-color: var(--base-bg-10);
  }

  &.error {
    background-color: var(--color-error-light);
  }

  &.success {
    background-color: var(--color-success-light);
  }

  &:hover {
    transform: translateY(2px);
  }

  &__icon {
    position: absolute;
    top: 50%;
    left: 10px;
    width: 24px;
    height: 24px;
    transform: translateY(-50%);
  }

  &__message {
    margin: 0 32px;
    font-size: 0.875rem;
    line-height: 1.25rem;
    opacity: 1;
    transition: opacity 600ms ease;
  }

  &__close-button {
    position: absolute;
    top: 50%;
    right: 10px;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    cursor: pointer;
    background-color: transparent;
    outline-color: transparent;
    transition: outline-color 300ms ease-in-out;
    transform: translateY(-50%);

    &:active,
    &:hover {
      .close-icon {
        transform: rotate(-90deg);
      }
    }

    &:focus-visible {
      outline: 2px solid var(--color-blue-dark);
      border-radius: 2px;
    }

    .close-icon {
      width: 100%;
      height: 100%;
      transition: transform 150ms ease-in-out;
    }
  }
}

@media screen and (min-width: 769px) {
  .base-notification {
    width: 320px;
    border-radius: 4px;
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: all 300ms ease, transform 250ms ease, margin 250ms ease, clip-path 400ms ease 150ms;
}

.notification-enter-from {
  clip-path: circle(0% at 50% 100%);
  .base-notification__message {
    opacity: 0 !important;
  }
}
.notification-enter-to {
  clip-path: circle(100% at 50% 100%);
  .base-notification__message {
    opacity: 1 !important;
  }
}
.notification-leave-from {
  opacity: 1 !important;
}
.notification-leave-to {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin: 0 !important;
  max-height: 0 !important;
  opacity: 0 !important;
}
</style>
