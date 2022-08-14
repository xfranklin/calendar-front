<template>
  <h1 class="subtitle-1">{{ $t("SIGN_UP_INTO") }}</h1>
  <div class="text">
    {{ $t("ALREADY_HAVE_ACCOUNT") }}
    <router-link :to="{ name: 'SignUp' }">{{ $t("SIGN_IN") }}</router-link>
    .
  </div>
</template>
<script setup></script>
<style lang="scss" scoped></style>
