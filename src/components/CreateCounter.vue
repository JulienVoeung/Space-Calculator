<script setup>
import { defineComponent } from "vue";

defineComponent({ name: "CreateCounter" });
</script>

<template lang="pug">
.column.justify-evenly
  .row.justify-center
    .column.col-4
      q-btn.q-ma-xs.bg-teal-13(
        rounded,
        dense,
        no-caps,
        size="0.9em",
        icon="add",
        label="Create a new counter",
        @click = "syncToServer"
        )
        q-tooltip(anchor="bottom left").bg-teal update server values
    .column.col-5
      q-btn.q-ma-xs.bg-teal-13(
        rounded,
        dense,
        no-caps,
        size="0.9em",
        icon="sync",
        label="Pull shared counters",
        @click = "syncFromServer"
        )
        q-tooltip(anchor="bottom right").bg-teal update local values from server
</template>
