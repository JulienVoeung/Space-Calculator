<script setup>
import { defineComponent } from "vue"

defineComponent({ name: "ForgotPasswordConfirmation" })
</script>

<template lang="pug">
q-page.q-pa-xl
  .text-h5
    | Reset Password
  .text
    | We sent you a reset link. Please follow the link in order to reset your password.
  .text
    | Do not forget to check your spam folder if you do not receive the email in your inbox.
</template>
