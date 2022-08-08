<template>
  <transition name="notification">
    <div v-show="visible" :class="['base-notification', type]">
      <BaseIcon v-if="iconName" :class="['base-notification__icon']" :name="iconName" />
      <div class="base-notification__message">{{ message }}</div>
      <BaseIcon class="base-notification__close" name="close" @click="close" />
      <div
        v-if="duration !== 'none'"
        :class="['base-notification__progress-bar']"
        :style="{ animationDuration: `${duration}ms` }"
      ></div>
    </div>
  </transition>
</template>
<script setup>
import BaseIcon from "@/components/base/BaseIcon.vue";
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "default"
  },
  duration: {
    type: [Number, String],
    String,
    default: 3500
  },

  message: {
    type: String,
    required: true
  }
});

const visible = ref(false);
let timer;

let iconName = null;
switch (props.type) {
  case "default":
    iconName = "info";
    break;
  case "warning":
    iconName = "alert-octagon";
    break;
  case "error":
    iconName = "alert-triangle";
    break;
  case "success":
    iconName = "check-circle";
    break;
}

const close = () => {
  visible.value = false;
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
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  color: var(--color-blue-dark);
  transition: all 150ms ease-in-out;
  transition-property: transform;
  overflow: hidden;

  &.default {
    color: var(--base-text-2);
    background-color: var(--base-bg-8);
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
    transform: translateY(4px);
  }

  &__icon {
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  &__message {
    margin-right: auto;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  &__close {
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
    margin-left: 8px;
    cursor: pointer;
    transition: transform 150ms ease-in-out;
    &:hover {
      transform: rotate(-90deg);
    }
  }

  &__progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: var(--color-blue-dark);
    animation-name: progress-bar;
    animation-timing-function: linear;
  }

  &.default .base-notification__progress-bar {
    background-color: var(--base-text-2);
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
  transition: opacity 0.5s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
}

@keyframes progress-bar {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
