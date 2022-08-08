<template>
  <div class="ui-kit">
    <Color-Mode label="Dark mode"/>

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
    <h2 class="headline-2">Headline 2</h2>
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
    <BaseIcon name="settings" />

    <div class="divider">
      <h2 class="subtitle-1">Buttons</h2>
      <hr />
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <button class="base-primary-button">Button</button>
      <button class="base-secondary-button">Button</button>
      <button class="base-primary-button icon"><BaseIcon name="google" group="socials" />Button</button>
      <button class="base-secondary-button icon"><BaseIcon name="settings" />Button</button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <button class="base-primary-button" disabled>Button</button>
      <button class="base-secondary-button" disabled>Button</button>
      <button class="base-primary-button icon" disabled><BaseIcon name="google" group="socials" />Button</button>
      <button class="base-secondary-button icon" disabled><BaseIcon name="settings" />Button</button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px">
      <button v-loading="loading_1" class="base-primary-button" @click="loading_1 = !loading_1">Loading</button>
      <button v-loading="loading_2" class="base-secondary-button" @click="loading_2 = !loading_2">Loading</button>
      <button v-loading="loading_3" class="base-primary-button icon" @click="loading_3 = !loading_3">
        <BaseIcon name="google" group="socials" />Loading
      </button>
      <button v-loading="loading_4" class="base-secondary-button icon" @click="loading_4 = !loading_4">
        <BaseIcon name="settings" />Loading
      </button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <button class="base-primary-outlined-button">Button</button>
      <button class="base-secondary-outlined-button">Button</button>
      <button class="base-primary-outlined-button icon"><BaseIcon name="facebook" group="socials" />Button</button>
      <button class="base-secondary-outlined-button icon"><BaseIcon name="eye" group="view" />Button</button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <button class="base-primary-outlined-button" disabled>Button</button>
      <button class="base-secondary-outlined-button" disabled>Button</button>
      <button class="base-primary-outlined-button icon" disabled>
        <BaseIcon name="facebook" group="socials" />Button
      </button>
      <button class="base-secondary-outlined-button icon" disabled><BaseIcon name="eye" group="view" />Button</button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px">
      <button v-loading="loading_5" class="base-primary-outlined-button" @click="loading_5 = !loading_5">
        Loading
      </button>
      <button v-loading="loading_6" class="base-secondary-outlined-button" @click="loading_6 = !loading_6">
        Loading
      </button>
      <button v-loading="loading_7" class="base-primary-outlined-button icon" @click="loading_7 = !loading_7">
        <BaseIcon name="facebook" group="socials" />Loading
      </button>
      <button v-loading="loading_8" class="base-secondary-outlined-button icon" @click="loading_8 = !loading_8">
        <BaseIcon name="eye" group="view" />Loading
      </button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <button class="base-primary-button only-icon"><BaseIcon name="facebook" group="socials" /></button>
      <button class="base-secondary-button only-icon"><BaseIcon name="eye" group="view" /></button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <button class="base-primary-button only-icon" disabled><BaseIcon name="facebook" group="socials" /></button>
      <button class="base-secondary-button only-icon" disabled><BaseIcon name="eye" group="view" /></button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px">
      <button v-loading="loading_9" class="base-primary-button only-icon" @click="loading_9 = !loading_9">
        <BaseIcon name="facebook" group="socials" />
      </button>
      <button v-loading="loading_10" class="base-secondary-button only-icon" @click="loading_10 = !loading_10">
        <BaseIcon name="eye" group="view" />
      </button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <button class="base-primary-outlined-button only-icon"><BaseIcon name="google" group="socials" /></button>
      <button class="base-secondary-outlined-button only-icon"><BaseIcon name="eye-off" group="view" /></button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <button class="base-primary-outlined-button only-icon" disabled>
        <BaseIcon name="google" group="socials" />
      </button>
      <button class="base-secondary-outlined-button only-icon" disabled>
        <BaseIcon name="eye-off" group="view" />
      </button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <button v-loading="loading_11" class="base-primary-outlined-button only-icon" @click="loading_11 = !loading_11">
        <BaseIcon name="google" group="socials" />
      </button>
      <button v-loading="loading_12" class="base-secondary-outlined-button only-icon" @click="loading_12 = !loading_12">
        <BaseIcon name="eye-off" group="view" />
      </button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px">
      <router-link class="base-link" :to="{ name: 'SignUp' }">Sign up</router-link>
      <router-link class="base-link icon" to="/"> <BaseIcon name="settings" />Privacy policy </router-link>
    </div>

    <div class="divider">
      <h2 class="subtitle-1">Inputs</h2>
      <hr />
    </div>
    <div style="display: flex; gap: 20px; align-items: flex-end">
      <div style="max-width: 360px; width: 100%">
        <BaseInput v-model="input_1" placeholder="example@example.com" />
      </div>
      <div style="max-width: 360px; width: 100%">
        <BaseInput v-model="input_2" placeholder="example@example.com" label="Email or username" />
      </div>
    </div>
    <div style="display: flex; gap: 20px; align-items: flex-end">
      <div style="max-width: 360px; width: 100%">
        <BaseInput v-model="input_3" />
      </div>
      <div style="max-width: 360px; width: 100%">
        <BaseInput v-model="input_4" label="Email or username" />
      </div>
    </div>
    <div style="display: flex; gap: 20px; align-items: flex-end">
      <div style="max-width: 360px; width: 100%">
        <BaseInput v-model="input_5" disabled />
      </div>
      <div style="max-width: 360px; width: 100%">
        <BaseInput v-model="input_6" disabled label="Email or username" />
      </div>
    </div>
    <div style="display: flex; gap: 20px; align-items: flex-end">
      <div style="max-width: 360px; width: 100%">
        <BaseInput ref="input_10" model-value="" :rules="[() => true && 'Error message']" />
      </div>
      <div style="max-width: 360px; width: 100%">
        <BaseInput ref="input_11" model-value="" label="Email or username" :rules="[() => true && 'Error message']" />
      </div>
    </div>
    <div style="display: flex; gap: 20px; align-items: flex-end">
      <div style="max-width: 360px; width: 100%">
        <BaseInput v-model="input_7" type="password" />
      </div>
      <div style="max-width: 360px; width: 100%">
        <BaseInput v-model="input_8" type="password" label="Password" />
      </div>
    </div>

    <div class="divider">
      <h2 class="subtitle-1">Form Validation</h2>
      <hr />
    </div>
    <BaseForm ref="form_1" style="max-width: 360px" @submit="validate_1">
      <BaseInput v-model="input_9" :rules="rules_1" label="Email" placeholder="exmaple@oooi.app" />
      <BaseInput v-model="input_12" :rules="rules_1" label="Password" type="password" />
      <button class="base-primary-button w-100" type="submit">Validate</button>
    </BaseForm>
    <BaseForm v-slot="{ valid }" style="max-width: 360px; margin-top: 2rem">
      <BaseInput v-model="input_13" :rules="rules_1" label="Email" placeholder="exmaple@oooi.app" />
      <BaseInput v-model="input_14" :rules="rules_1" label="Password" type="password" />
      <button class="base-primary-button w-100" :disabled="!valid" type="submit">Validate</button>
    </BaseForm>
    <div class="divider">
      <h2 class="subtitle-1">Switch</h2>
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
import { ref, watch, onMounted } from "vue";
import ColorMode from "@/components/ui/ColorMode.vue";


const variableFont = ref(null);
const variableWeight = ref(200);

const input_1 = ref("");
const input_2 = ref("");
const input_3 = ref("");
const input_4 = ref("");
const input_5 = ref("support@oooi.app");
const input_6 = ref("support@oooi.app");
const input_7 = ref("");
const input_8 = ref("");
const input_9 = ref("");
const input_10 = ref(null);
const input_11 = ref(null);
const input_12 = ref("");
const input_13 = ref("");
const input_14 = ref("");

const rules_1 = [
  (value) => !value && "Required",
  (value) => value.length <= 2 && "At least 2 chars",
  (value) => value.length > 8 && "Max 8 chars"
];

const loading_1 = ref(false);
const loading_2 = ref(false);
const loading_3 = ref(false);
const loading_4 = ref(false);
const loading_5 = ref(false);
const loading_6 = ref(false);
const loading_7 = ref(false);
const loading_8 = ref(false);
const loading_9 = ref(false);
const loading_10 = ref(false);
const loading_11 = ref(false);
const loading_12 = ref(false);

const switch_1 = ref(false);
const switch_2 = ref(true);
const switch_3 = ref(false);
const switch_4 = ref(true);


watch(variableWeight, (weight) => {
  variableFont.value.style.fontWeight = weight;
});

onMounted(() => {
  input_10.value.validateInput();
  input_11.value.validateInput();
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
