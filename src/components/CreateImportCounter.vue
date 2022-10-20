<script setup>
import { defineComponent, ref, computed } from "vue";
import { state } from "src/stores/countersState";
import useSupabase from "src/boot/supabase";

defineComponent({ name: "CreateCounter" });

const { supabase } = useSupabase();
const addCounterDialog = ref(false);
const importCounterDialog = ref(false);
const counterName = ref('');
const counterId = ref('');
const counterNameInput = ref(null);

const importCounter = async (counterId) => {
    const { data, error } = await supabase
    .from('counters')
    .select('*')
    .match({counter_id: counterId});
    if (error) throw error;
    state.addCounter(data[0].name);
    state.addShared(data[0].name);
    state.setVal(data[0].name, data[0].value);
    subscribe(data[0].name, counterId);
  }

function subscribe(counterName, counterId) {
  console.log('Subscribe to counter ' + counterName);
  const counters = supabase
  .from('counters:counter_id=eq.' + counterId)
  .on('UPDATE', payload => {
    state.setVal(counterName, payload.new.value);
    console.log('Subscribe event: Counter ' + counterName + ' updated.')
  })
  .subscribe();
}
</script>

<template lang="pug">
.column.justify-evenly
  .row.justify-center
    .column
      q-btn.q-ma-xs.q-pa-md.q-mr-xl(
        ref="counterNameInput"
        rounded,
        dense,
        no-caps,
        color = "red",
        size="0.9em",
        icon="add",
        label="Create a new counter",
        @click="addCounterDialog = true",
        )
        q-tooltip(anchor="bottom left").bg-teal Create a new counter
        q-dialog(v-model='addCounterDialog' @before-hide="counterName=''")
          q-card(style='min-width: 350px')
            q-card-section
              .text-h6 Counter name
            q-card-section.q-pt-none
              q-input(v-model='counterName' autofocus=true @keyup.enter="state.addCounter(counterName) ; addCounterDialog = false")
            q-card-actions.text-primary(align='right')
              q-btn(label='Confirm' @click="state.addCounter(counterName)" v-close-popup='')
    .column
      q-btn.q-ma-xs.q-pa-md(
        rounded,
        dense,
        no-caps,
        color = "green",
        size="0.9em",
        icon="sync",
        label="Import counter",
        @click = "importCounterDialog = true"
        )
        q-tooltip(anchor="bottom right").bg-teal Import counter
        q-dialog(v-model='importCounterDialog' @before-hide="counterId=''")
          q-card(style='min-width: 350px')
            q-card-section
              .text-h6 Counter ID
            q-card-section.q-pt-none
              q-input(v-model='counterId' autofocus=true @keyup.enter='importCounter(counterId); importCounterDialog = false')
            q-card-actions.text-primary(align='right')
              q-btn(label='Confirm' @click="importCounter(counterId)" v-close-popup='')
</template>
