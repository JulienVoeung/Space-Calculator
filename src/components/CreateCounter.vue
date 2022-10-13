<script>
import { defineComponent } from "vue";

import { ref } from 'vue'

export default {
  setup () {
    defineComponent({ name: "CreateCounter" });

    return {
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),

      address: ref('')
    }
  }
}
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
        @click = "syncToServer"
        )
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
        @click = "prompt = true"
        )
        q-tooltip(anchor="bottom right").bg-teal Pull shared counters
        q-dialog(v-model='prompt' persistent='')
          q-card(style='min-width: 350px')
            q-card-section
              .text-h6 Your address
            q-card-section.q-pt-none
              q-input(dense='' v-model='address' autofocus='' @keyup.enter='prompt = false')
            q-card-actions.text-primary(align='right')
              q-btn(flat='' label='Cancel' v-close-popup='')
              q-btn(flat='' label='Add address' v-close-popup='')


</template>
