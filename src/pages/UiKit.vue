<template>
  <div class="ui-kit">
    <BaseSwitch :model-value="darkMode" label="Dark mode" @update:model-value="changeMode" />
    <div class="divider">
      <h2 class="subtitle-1">Typography</h2>
      <hr />
    </div>
    <div style="display: flex">
      <div>
        <h1 class="headline-1">Headline 1</h1>
        <h2 class="headline-2">Headline 2</h2>
        <h3 class="headline-3">Headline 3</h3>
        <div class="subtitle-1">Subtitle 1</div>
        <div class="subtitle-2">Subtitle 2</div>
        <div>text</div>
        <div class="small-text">small text</div>
      </div>
      <div style="margin-left: 4rem">
        <h1 class="variable">Headline 1</h1>
      </div>
    </div>

    <div class="divider">
      <h2 class="subtitle-1">Form</h2>
      <hr />
    </div>
    <div style="display: flex">
      <div>
        <BaseSwitch v-model="switch_1" label="Toggle me" />
        <BaseSwitch v-model="switch_2" label="Toggle me" />
      </div>
      <div style="margin-left: 2rem">
        <BaseSwitch v-model="switch_3" disabled label="Toggle me" />
        <BaseSwitch v-model="switch_4" disabled label="Toggle me" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const switch_1 = ref(false);
const switch_2 = ref(true);
const switch_3 = ref(false);
const switch_4 = ref(true);
const darkMode = ref(false);

const disableTransitions = () => {
  const css = document.createElement("style");
  css.setAttribute("id", "off-transition");
  css.appendChild(
    document.createTextNode(
      `* {
       -webkit-transition: none !important;
       -moz-transition: none !important;
       -o-transition: none !important;
       -ms-transition: none !important;
       transition: none !important;
      }`
    )
  );
  document.head.appendChild(css);
};

const enableTransitions = () => {
  const css = document.getElementById("off-transition");
  css && css.remove();
};

const changeMode = async (value) => {
  disableTransitions();
  const html = document.documentElement;
  darkMode.value = value;
  if (value) {
    html && html.setAttribute("dark", "");
  } else {
    html && html.removeAttribute("dark");
  }
  await new Promise((res) => {
    setTimeout(() => {
      res();
    }, 50);
  });
  enableTransitions();
};
</script>
<style lang="scss" scoped>
.header {
}

.ui-kit {
  margin: 0.5rem 1.5rem;
  max-width: 960px;
  width: 100%;
}

.divider {
  margin: 2rem 0 1rem;
}
</style>
