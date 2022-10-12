<script setup>
import { defineComponent } from "vue"
import MeComponent from 'src/components/MeComponent.vue'

defineComponent({ name: "MePage" })
</script>

<template lang="pug">
q-page
  MeComponent
</template>
