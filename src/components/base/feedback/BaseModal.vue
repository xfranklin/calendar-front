<template>
  <teleport to="#oooi-app">
    <transition name="modal">
      <div v-if="open" :class="['base-modal', { fullscreen }]" @click.self="close">
        <div ref="modal" tabindex="0" class="base-modal__body">
          <div class="base-modal__actions">
            <button class="clear-button" @click="close">
              <BaseIcon name="close" />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script setup>
import { watch, ref, nextTick } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  fullscreen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:open"]);
const modal = ref(null);

watch(
  () => props.open,
  async (value) => {
    if (value) {
      document.addEventListener("keydown", onEsc);
      document.documentElement.style.overflow = "hidden";
      await nextTick(() => {
        modal.value.focus();
      });
    } else {
      document.removeEventListener("keydown", onEsc);
      document.documentElement.style.overflow = "";
    }
  }
);

const close = () => {
  emit("update:open", false);
};

const onEsc = (event) => {
  if (props.open && event.key === "Escape") {
    close();
  }
};
</script>
<style lang="scss">
[dark] .base-modal__body {
  background-image: url("../../../assets/images/layouts/noise-bg-dark.png"),
    radial-gradient(200% 200% at 120% 125%, #0f1011 10%, #091b1f 24%, #0b272d 55%, #0c272c 50%);
}
.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 16px 8px;
  overflow-y: auto;
  backdrop-filter: saturate(140%) blur(4px);
  background-color: rgba(0, 15, 31, 0.2);

  &__body {
    position: relative;
    margin: auto;
    border: 2px solid var(--base-bg-2);
    background-color: var(--color-white);
    background-image: url("../../../assets/images/layouts/noise-bg.png");
    border-radius: 16px;
  }

  &__actions {
    display: flex;
    position: absolute;
    top: 16px;
    right: 16px;
  }

  &.fullscreen {
    align-items: flex-start;
    height: 100%;
    padding: 0;

    .base-modal__body {
      width: 100%;
      min-height: 100%;
      border: none;
      border-radius: unset;
    }
  }
}

@media screen and (min-width: 769px) {
  .base-modal {
    &__actions {
      top: 24px;
      right: 24px;
    }
  }
}

.modal-enter-active {
  transition: all 250ms ease;
  &.base-modal:not(.fullscreen) .base-modal__body {
    animation: rebound 500ms;
  }
}

.modal-leave-active {
  transition: all 150ms ease;
  .base-modal__body {
    transition: all 150ms ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  &.base-modal:not(.fullscreen) .base-modal__body {
    transform: scale(0.6);
  }
  &.fullscreen {
    transform: translate(0, 8%) !important;
  }
}

@keyframes rebound {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.05);
  }
  80% {
    transform: scale(0.96);
  }
  100% {
    transform: scale(1);
  }
}
</style>
