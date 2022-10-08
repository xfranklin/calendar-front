<template>
  <component :is="dynamicIcon" class="base-icon" />
</template>

<script setup>
import { watch, shallowRef, defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  group: {
    type: String,
    default: "regular"
  }
});

const dynamicIcon = shallowRef(null);

watch(
  () => props.name,
  (name, oldName) => {
    if (name !== oldName) {
      dynamicIcon.value = defineAsyncComponent(() => import(`./../../assets/icons/${props.group}/${name}.svg`));
    }
  },
  { immediate: true }
);
</script>
