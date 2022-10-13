<script setup>
import { defineComponent } from "vue";

defineComponent({ name: "CreateCounter" });
</script>

<template lang="pug">
.column.justify-evenly
  .row.justify-center
    .column.col-4
      q-btn.q-ma-xs(
        rounded,
        dense,
        no-caps,
        color = "red",
        size="0.9em",
        icon="add",
        label="Create a new counter",
        @click = "prompt = true"
        )
        q-dialog(v-model="prompt" persistent='')
          q-card(style='min-width: 350px')
            q-card-section
              .text-h6 counter name
            q-card-section.q-pt-none
              q-input(dense='', v-model="address", autofocus='' @keyup.enter="prompt = false")
            q-card-actions.text-primary(align='right')
              q-btn(label='Cancel', @click="prompt = false")
              q-btn(label='Add button')
        q-tooltip(anchor="bottom left").bg-teal Create a new counter
    .column.col-5
      q-btn.q-ma-xs(
        rounded,
        dense,
        no-caps,
        color = "green",
        size="0.9em",
        icon="sync",
        label="Pull shared counters",
        @click = ""
        )
        q-tooltip(anchor="bottom right").bg-teal Pull shared counters
</template>
