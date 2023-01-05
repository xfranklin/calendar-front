<template>
  <div class="empty-layout">
    <slot />
  </div>
</template>
<style scoped>
.empty-layout {
  min-height: 100vh;
  padding-top: 60px;
  background-color: var(--color-white);
  background-image: url("../assets/images/layouts/noise-bg.png");
}

[dark] .empty-layout {
  /* TODO rewrite gradient-bg (ask Dasha) */
  background-image: url("../assets/images/layouts/noise-bg-dark.png"),
    radial-gradient(200% 200% at 120% 125%, #0f1011 10%, #091b1f 24%, #0b272d 55%, #0c272c 50%);
}
</style>
