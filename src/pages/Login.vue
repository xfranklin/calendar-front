<template>
  <h2>Login</h2>
  <button @click="refresh">refresh</button>
  <form @submit.prevent="logIn">
    <input v-model="loginData.email" type="text" />
    <input v-model="loginData.password" type="text" />
    <button type="submit">sign up</button>
  </form>
  <button @click="google">google</button>
  <button @click="test">User</button>
  <hr />
  <router-link :to="{ name: 'Login' }">login</router-link><br />
  <router-link :to="{ name: 'SignUp' }">signup</router-link><br />
  <router-link :to="{ name: 'Reset' }">reset</router-link><br />
  <router-link :to="{ name: 'Secret' }">secret</router-link><br />
</template>
<script setup>
import { reactive } from "vue";
import { useServices } from "@/composables/useServices";

const loginData = reactive({
  email: "",
  password: ""
});
const $services = useServices();

const logIn = async () => {
  await $services.authService.signUp(loginData);
};

const test = async () => {
  await $services.authService.test();
};

const refresh = async () => {
  await $services.authService.refresh();
};

const google = async () => {
  const response = await $services.authService.getGoogleUrl();
  console.log(response);
};
</script>
<style lang="scss" scoped></style>
