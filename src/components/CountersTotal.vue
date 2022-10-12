<script setup>
import { defineComponent, computed } from "vue";
import { state } from "../stores/countersState";

defineComponent({ name: "CountersTotal" })
let total = computed(() => state.getVal("A") + state.getVal("B"));
</script>

<template lang="pug">
.column.flex.flex-center
  p.q-ma-md.text-h5.text-purple-9 Total
  p.q-my-md.q-mx-xl.text-h5.text-cyan {{ total }}
</template>
