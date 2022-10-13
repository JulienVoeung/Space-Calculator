<script setup>
import { defineComponent, toRef } from "vue";
import { state } from "../stores/countersState";
import useAuthUser from "src/composables/UseAuthUser";
import useAPI from "src/composables/UseApi";
import { ref } from 'vue';

defineComponent({ name: "CounterComponent" });

const { isSignedIn } = useAuthUser();

const props = defineProps({
  id: {
    required: true,
    validator(value) {
      return ["A", "B"].includes(value);
    },
  },
});

const { syncToServer, getCounterId } = useAPI(props.id);

const counterValue = toRef(state, "counter" + props.id);

async function counterId(letter) {
  document.getElementById("counterIdField").innerHTML = await getCounterId(letter)
}

const alert = ref(false);

</script>

<template lang="pug">
.column.justify-evenly
  p.q-ma-md.text-h5.text-purple-9.self-center Counter {{ id }}
    q-btn.q-ma-xs(
          color="red",
          rounded,
          :disabled="!isSignedIn",
          no-caps,
          size="0.6em",
          icon="delete",
          label="Delete Counter",
          @click = ""
          )
          q-tooltip(anchor="bottom left").bg-teal Delete counter
  .row.justify-center.items-end
    q-btn.q-ma-md.col-1(rounded, color="cyan", @click="state.incr(id)")
      q-tooltip(anchor="top left").bg-teal increment
      q-icon(name="arrow_drop_up", size="md")
    q-input.col-8(
      v-model.number="counterValue",
      placeholder="Enter number",
      error-message = "Input must be a number",
      outlined,
      dense,
      rounded,
      input-class=" text-h5 text-center text-cyan",
      :rules="[val => (Number.isFinite(val)) || 'error']"
      )
      q-tooltip(anchor="bottom middle").bg-teal Enter number
    q-btn.q-ma-md.col-1(rounded, color="cyan", @click="state.decr(id)")
      q-tooltip(anchor="top right").bg-teal decrement
      q-icon(name="arrow_drop_down", size="md")
  .row.justify-center
    .column.col-4
      q-btn.q-ma-xs(
        rounded,
        color="orange"
        :disabled="!isSignedIn",
        dense,
        no-caps,
        size="0.9em",
        icon="share",
        label="Share counter",
        @click = "alert = true"
        )
        q-tooltip(anchor="bottom right").bg-teal Share counter
        q-dialog(v-model='alert')
          q-card
            q-card-section
              .text-h6 Share this counter
            q-card-section.q-pt-none
              | Share the below code with anyone so he can import your counter.
              q-field(filled='' label='Counter ID' stack-label='' id="counterIdField")
                template(v-slot:control)
                  .self-center.full-width.no-outline(tabindex='0') {{ counterId(id) }}
            q-card-actions(align='right')
              q-btn(flat='' label='OK' color='primary' v-close-popup='')
    .column.col-5
      q-btn.q-ma-xs.bg-teal-13(
          rounded,
          :disabled="!isSignedIn",
          dense,
          no-caps,
          size="0.9em",
          icon="cloud_upload",
          label="Sync local to Server",
          @click = "syncToServer"
          )
          q-tooltip(anchor="bottom left").bg-teal update server values
</template>
