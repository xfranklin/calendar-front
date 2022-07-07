<template>
  <div class="ui-kit">
    <BaseSwitch :model-value="darkMode" label="Dark mode" @update:model-value="changeMode" />
    <div class="divider">
      <h2 class="subtitle-1">Typography</h2>
      <hr />
    </div>

    <h1 id="h1-variable" ref="variableFont">
      ABC DEF GHI JKL MNO PQR STU VWX YZ abc def ghi jkl mno pqr stu vwx yz 01234 56789
    </h1>
    <br />
    <input v-model="variableWeight" type="range" min="200" max="800" />
    {{ variableWeight }}

    <br /><br />

    <h1 class="headline-1">Headline 1</h1>
    <h2 class="headline-2">Headline 2</h2>A
    <h3 class="headline-3">Headline 3</h3>
    <div class="subtitle-1">Subtitle 1</div>
    <div class="subtitle-2">Subtitle 2</div>
    <div>text</div>
    <div class="small-text">small text</div>

    <div class="divider">
      <h2 class="subtitle-1">Icons</h2>
      <hr />
    </div>
    <BaseIcon name="google" group="socials" />
    <BaseIcon name="facebook" group="socials" />
    <BaseIcon name="eye" group="view" />
    <BaseIcon name="eye-off" group="view" />

    <div class="divider">
      <h2 class="subtitle-1">Buttons</h2>
      <hr />
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <button class="primary-button">Button</button>
      <button class="primary-button" disabled>Button</button>
      <button class="secondary-button">Button</button>
      <button class="secondary-button" disabled>Button</button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px">
      <button class="primary-button icon"><BaseIcon name="google" group="socials" />Button</button>
      <button class="primary-button icon" disabled><BaseIcon name="facebook" group="socials" />Button</button>
      <button class="secondary-button icon"><BaseIcon name="eye" group="view" />Button</button>
      <button class="secondary-button icon" disabled><BaseIcon name="settings" />Button</button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <button class="primary-outlined-button">Button</button>
      <button class="primary-outlined-button" disabled>Button</button>
      <button class="secondary-outlined-button">Button</button>
      <button class="secondary-outlined-button" disabled>Button</button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px">
      <button class="primary-outlined-button icon"><BaseIcon name="google" group="socials" />Button</button>
      <button class="primary-outlined-button icon" disabled><BaseIcon name="facebook" group="socials" />Button</button>
      <button class="secondary-outlined-button icon"><BaseIcon name="eye" group="view" />Button</button>
      <button class="secondary-outlined-button icon" disabled><BaseIcon name="settings" />Button</button>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <button class="primary-button only-icon"><BaseIcon name="google" group="socials" /></button>
      <button class="primary-button only-icon" disabled><BaseIcon name="facebook" group="socials" /></button>
      <button class="secondary-button only-icon"><BaseIcon name="eye" group="view" /></button>
      <button class="secondary-button only-icon" disabled><BaseIcon name="settings" /></button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <button class="primary-outlined-button only-icon"><BaseIcon name="google" group="socials" /></button>
      <button class="primary-outlined-button only-icon" disabled><BaseIcon name="facebook" group="socials" /></button>
      <button class="secondary-outlined-button only-icon"><BaseIcon name="eye" group="view" /></button>
      <button class="secondary-outlined-button only-icon" disabled><BaseIcon name="settings" /></button>
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
import { ref, watch } from "vue";

const variableFont = ref(null);
const variableWeight = ref(200);

const switch_1 = ref(false);
const switch_2 = ref(true);
const switch_3 = ref(false);
const switch_4 = ref(true);

const darkMode = ref(false);

const disableTransitions = () => {
  const css = document.createElement("style");
  css.setAttribute("id", "off-transition");
  // css.appendChild(
  //   document.createTextNode(
  //     `* {
  //      -webkit-transition: none !important;
  //      -moz-transition: none !important;
  //      -o-transition: none !important;
  //      -ms-transition: none !important;
  //      transition: none !important;
  //     }`
  //   )
  // );
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

watch(variableWeight, (weight) => {
  variableFont.value.style.fontWeight = weight;
});
</script>

<style lang="scss" scoped>
#h1-variable {
  font-size: 2rem;
  font-weight: 100;
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
