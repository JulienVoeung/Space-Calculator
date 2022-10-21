<script setup>
import { defineComponent } from "vue"
import ResetPasswordComponent from "components/ResetPasswordComponent.vue"

defineComponent({ name: "ResetPasswordPage" })
</script>

<template lang="pug">
q-page.q-pa-xl
  ResetPasswordComponent
</template>
