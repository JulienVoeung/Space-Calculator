<script setup>
import { defineComponent } from 'vue'

defineComponent({ name: 'ErrorPageNotFound' })
</script>

<template lang="pug">
.column.bg-blue.flex.flex-center
  .text-white.text-h1.q-ma-xl Error 404 Page Not Found
  q-btn.q-ma-xl(
    color="white",
    text-color="blue",
    unelevated,
    to="/",
    label="Back Home",
    no-caps)
</template>
