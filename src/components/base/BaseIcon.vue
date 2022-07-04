<template>
  <component :is="dynamicIcon" class="base-icon"></component>
</template>

<script setup>
import { defineProps, defineAsyncComponent, computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  }
});

const dynamicIcon = computed(() => {
  return defineAsyncComponent(() => import(`./../../assets/icons/${props.group}/${props.name}.svg`));
});
</script>
