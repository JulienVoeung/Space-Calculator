<script setup>
import { defineComponent } from "vue"
import ForgotPasswordComponent from 'src/components/ForgotPasswordComponent.vue'

defineComponent({ name: "ForgotPasswordPage" })
</script>

<template lang="pug">
q-page.q-pa-xl
  ForgotPasswordComponent
</template>
