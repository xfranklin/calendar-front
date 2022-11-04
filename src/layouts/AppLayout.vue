<template>
  <div class="app-layout">
    <Header />
    <Sidebar />
    <slot />
  </div>
</template>
<script setup>
import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
</script>
<style lang="scss">
.app-layout {
  min-height: 100vh;
  background-color: var(--color-white);
  background-image: url("../assets/images/layouts/noise-bg.png");
}

[dark] .app-layout {
  background-image: url("../assets/images/layouts/noise-bg-dark.png"),
    radial-gradient(200% 200% at 120% 125%, #0f1011 10%, #091b1f 24%, #0b272d 55%, #0c272c 50%);
}
</style>
